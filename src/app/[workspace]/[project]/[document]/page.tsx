"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAddFlowEdge, useCreatePage, useDeleteFlowEdge, useDocumentPages, useFlow, useLocks, useUpdatePage } from "@/src/hooks/api";
import { PageListItem } from "@/src/ui/page-list-item";
import { useEditorStore } from "@/src/store/editor";
import { useAcquireLock, useLockHeartbeat, useReleaseLock } from "@/src/hooks/locks";
import { useEffect } from "react";
import { ArtboardComponent } from "@/src/ui/artboard";
import type { Artboard as ArtboardType } from "@/src/types/page-builder";
import { FlowCanvas } from "@/src/ui/flow-canvas";
import { useSession } from "next-auth/react";
import { canEdit } from "@/src/lib/rbac";
import { ElementList } from "@/src/ui/element-list";

interface Params {
  params: { workspace: string; project: string; document: string };
}

const modes = ["pages", "flow"] as const;
type Mode = (typeof modes)[number];
const devices = ["mobile", "desktop"] as const;
type Device = (typeof devices)[number];

export default function DocumentPage({ params }: Params) {
  const router = useRouter();
  const search = useSearchParams();
  const mode = (search.get("mode") as Mode) || useEditorStore.getState().mode;
  const device = (search.get("device") as Device) || useEditorStore.getState().device;
  const setMode = useEditorStore((s) => s.setMode);
  const setDevice = useEditorStore((s) => s.setDevice);
  const selectedPageId = useEditorStore((s) => s.selectedPageId);
  const selectPage = useEditorStore((s) => s.selectPage);

  function setQuery(key: string, value: string) {
    const sp = new URLSearchParams(search.toString());
    sp.set(key, value);
    router.replace(`/${params.workspace}/${params.project}/${params.document}?${sp.toString()}`);
  }

  const headerTitle = useMemo(() => `${params.document}`, [params.document]);
  const { data } = useDocumentPages(params.document);
  const createPage = useCreatePage(params.document);
  const updatePage = useUpdatePage(params.document, selectedPageId || undefined);
  const { data: flow } = useFlow(params.document);
  const { data: locks } = useLocks(params.document);
  const { data: session } = useSession();

  const addEdge = useAddFlowEdge(params.document);
  const deleteEdge = (edgeId: string) => useDeleteFlowEdge(params.document, edgeId).mutate();

  function handleCreatePage() {
    const count = (data?.items?.length || 0) + 1;
    createPage.mutate({ name: `Untitled ${count}`, device: device });
  }

  const selectedPage = useMemo(() => data?.items?.find((p: any) => p.id === selectedPageId), [data, selectedPageId]);

  const artboard: ArtboardType | null = useMemo(() => {
    if (!selectedPage) return null;
    const width = device === "mobile" ? 390 : 1200;
    const height = device === "mobile" ? 844 : 900;
    return {
      id: selectedPage.id,
      name: selectedPage.name,
      width,
      height,
      type: device,
      gap: 16,
      status: "draft",
      children: selectedPage.elements || [],
      autoHeight: true,
      navbarVariant: "ios",
      navbarTitle: selectedPage.name,
      navbarDescription: "",
      navbarRightIcon: undefined,
      navbarShowNavigation: true,
      navbarShowTitle: true,
      navbarShowDescription: false,
      navbarShowRightButton: false,
    } as ArtboardType;
  }, [selectedPage, device]);

  const flowArtboards: ArtboardType[] = useMemo(() => {
    const items = data?.items || [];
    return items.map((p: any) => {
      const width = 320;
      const height = 200;
      return {
        id: p.id,
        name: p.name,
        width,
        height,
        type: "desktop",
        gap: 8,
        status: "draft",
        children: p.elements || [],
        autoHeight: false,
      } as ArtboardType;
    });
  }, [data]);

  // Document-level lock on mount/unmount (scaffold)
  const { mutate: acquire } = useAcquireLock();
  const { mutate: release } = useReleaseLock();
  const lockId = useEditorStore((s) => s.currentLockId);
  const setCurrentLock = useEditorStore((s) => s.setCurrentLock);
  useLockHeartbeat(lockId, 10000);

  // element-level lock map
  const elementLocksRef = (globalThis as any).__elementLocksRef || new Map<string, string>();
  ;(globalThis as any).__elementLocksRef = elementLocksRef;

  useEffect(() => {
    let active = true;
    acquire({ documentId: params.document, scope: "DOCUMENT" }, {
      onSuccess: (res: any) => {
        if (!active) return;
        setCurrentLock(res.id);
      },
    });
    return () => {
      active = false;
      const id = useEditorStore.getState().currentLockId;
      if (id) release({ lockId: id });
      setCurrentLock(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.document]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-2">
        <h1 className="text-base font-medium" aria-label="Document name">
          {headerTitle}
        </h1>
        <div className="flex items-center gap-2">
          <nav aria-label="Mode switch" className="flex rounded border border-neutral-800 p-1" role="tablist">
            {modes.map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => { setMode(m); setQuery("mode", m); }}
                className={`px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${mode === m ? "bg-neutral-800" : "bg-transparent"}`}
                tabIndex={0}
                aria-label={`Switch to ${m} mode`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { setMode(m); setQuery("mode", m); }
                }}
              >
                {m}
              </button>
            ))}
          </nav>
          {mode === "pages" && (
            <nav aria-label="Device switch" className="flex rounded border border-neutral-800 p-1" role="tablist">
              {devices.map((d) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={device === d}
                  onClick={() => { setDevice(d); setQuery("device", d); }}
                  className={`px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${device === d ? "bg-neutral-800" : "bg-transparent"}`}
                  tabIndex={0}
                  aria-label={`Switch to ${d}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { setDevice(d); setQuery("device", d); }
                  }}
                >
                  {d}
                </button>
              ))}
            </nav>
          )}
          <button
            onClick={() => setQuery("export", "open")}
            className="rounded border border-neutral-800 px-3 py-1 text-sm outline-none hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="Export"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setQuery("export", "open");
            }}
          >
            Export
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-neutral-800 p-3 md:block" aria-label="Sidebar">
          <div className="mb-3 text-xs uppercase text-neutral-400">Pages</div>
          <div className="space-y-1">
            {(data?.items || []).map((p: any) => (
              <PageListItem
                key={p.id}
                documentId={params.document}
                page={p}
                isSelected={selectedPageId === p.id}
                onSelect={selectPage}
              />
            ))}
            <button
              className="mt-2 w-full rounded bg-neutral-900 px-2 py-1 text-left text-sm hover:bg-neutral-800"
              aria-label="Create page"
              tabIndex={0}
              onClick={handleCreatePage}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCreatePage();
              }}
            >
              + New page
            </button>
          <div className="mt-6 border-t border-neutral-800 pt-3">
            <div className="mb-2 text-xs uppercase text-neutral-400">Insert</div>
            <div className="space-y-2">
              <button
                className="w-full rounded border border-neutral-700 px-2 py-1 text-left text-sm hover:bg-neutral-800"
                disabled={!canEdit((session as any)?.role || 'OWNER')}
                onClick={() => {
                  if (!selectedPage) return;
                  const el = { id: crypto.randomUUID(), type: "text", props: { content: "Sample text" }, children: [] } as any;
                  const next = [...(selectedPage.elements || []), el];
                  updatePage.mutate({ elements: next });
                }}
              >Text</button>
              <button
                className="w-full rounded border border-neutral-700 px-2 py-1 text-left text-sm hover:bg-neutral-800"
                disabled={!canEdit((session as any)?.role || 'OWNER')}
                onClick={() => {
                  if (!selectedPage) return;
                  const el = { id: crypto.randomUUID(), type: "button", props: { children: "Button" }, children: [] } as any;
                  const next = [...(selectedPage.elements || []), el];
                  updatePage.mutate({ elements: next });
                }}
              >Button</button>
            </div>
          </div>
          {selectedPage && (
            <div className="mt-6 border-t border-neutral-800 pt-3">
              <div className="mb-2 text-xs uppercase text-neutral-400">Elements</div>
              <ElementList
                elements={(selectedPage.elements || []).map((n: any) => ({ id: n.id, type: n.type }))}
                onReorder={(ids) => {
                  if (!selectedPage?.elements) return;
                  const byId = new Map(selectedPage.elements.map((n: any) => [n.id, n]));
                  const next = ids.map((id) => byId.get(id)).filter(Boolean) as any[];
                  updatePage.mutate({ elements: next });
                }}
              />
            </div>
          )}
          </div>
        </aside>
        <main className="flex-1 p-4" aria-live="polite">
          {mode === "pages" ? (
            artboard ? (
              <div className="flex justify-center">
                <ArtboardComponent
                  artboard={artboard}
                  disablePositioning
                  onSelectElement={() => {}}
                  selectedElement={null}
                  lockedElementIds={new Set((locks?.items || []).filter((l:any)=>l.scope==='ELEMENT').map((l:any)=>l.elementId))}
                  onStartEditing={(componentId, prop, value) => {
                    if (!canEdit((session as any)?.role || 'OWNER')) return;
                    // acquire element lock if not already held
                    if (!elementLocksRef.get(componentId)) {
                      acquire({ documentId: params.document, scope: "ELEMENT", elementId: componentId }, {
                        onSuccess: (res: any) => elementLocksRef.set(componentId, res.id),
                      });
                    }
                  }}
                  onCancelEditing={() => {
                    // release all element locks held by this page instance
                    for (const [el, id] of elementLocksRef.entries()) {
                      release({ lockId: id });
                      elementLocksRef.delete(el);
                    }
                  }}
                  onMoveComponentUp={(elementId) => {
                    if (!selectedPage?.elements) return;
                    if (!canEdit((session as any)?.role || 'OWNER')) return;
                    const idx = selectedPage.elements.findIndex((n: any) => n.id === elementId);
                    if (idx <= 0) return;
                    const next = [...selectedPage.elements];
                    const [m] = next.splice(idx, 1);
                    next.splice(idx - 1, 0, m);
                    updatePage.mutate({ elements: next });
                  }}
                  onMoveComponentDown={(elementId) => {
                    if (!selectedPage?.elements) return;
                    if (!canEdit((session as any)?.role || 'OWNER')) return;
                    const idx = selectedPage.elements.findIndex((n: any) => n.id === elementId);
                    if (idx < 0 || idx >= selectedPage.elements.length - 1) return;
                    const next = [...selectedPage.elements];
                    const [m] = next.splice(idx, 1);
                    next.splice(idx + 1, 0, m);
                    updatePage.mutate({ elements: next });
                  }}
                  onDeleteElement={(elementId) => {
                    if (!selectedPage?.elements) return;
                    if (!canEdit((session as any)?.role || 'OWNER')) return;
                    const lockedIds = new Set((locks?.items || []).filter((l:any)=>l.scope==='ELEMENT').map((l:any)=>l.elementId));
                    if (lockedIds.has(elementId)) return;
                    const next = selectedPage.elements.filter((n: any) => n.id !== elementId);
                    updatePage.mutate({ elements: next });
                  }}
                  onSaveEditing={(elementId, prop, value) => {
                    if (!selectedPage) return;
                    if (!canEdit((session as any)?.role || 'OWNER')) return;
                    const lockedIds = new Set((locks?.items || []).filter((l:any)=>l.scope==='ELEMENT').map((l:any)=>l.elementId));
                    if (lockedIds.has(elementId)) return;
                    // immutably update element by id
                    function patch(nodes: any[]): any[] {
                      return nodes.map((n) => {
                        if (n.id === elementId) {
                          const nextProps = { ...(n.props || {}) };
                          nextProps[prop] = value;
                          return { ...n, props: nextProps };
                        }
                        if (n.children?.length) return { ...n, children: patch(n.children) };
                        return n;
                      });
                    }
                    const nextElements = patch(selectedPage.elements || []);
                    updatePage.mutate({ elements: nextElements });
                    // release element lock after save
                    const held = elementLocksRef.get(elementId);
                    if (held) { release({ lockId: held }); elementLocksRef.delete(elementId); }
                  }}
                />
              </div>
            ) : (
              <div className="grid place-items-center rounded border border-neutral-800 p-8 text-neutral-400">
                <div className="text-sm">Select or create a page</div>
              </div>
            )
          ) : (
            <div className="h-full min-h-[60vh] rounded border border-neutral-800 p-2">
              <div className="mb-2 flex items-center gap-2">
                <select id="flow-source" className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm">
                  {(data?.items || []).map((p:any)=> (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
                <span className="text-neutral-400 text-sm">→</span>
                <select id="flow-target" className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm">
                  {(data?.items || []).map((p:any)=> (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
                <select id="flow-source-kind" className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm">
                  <option value="page">page</option>
                  <option value="element">element</option>
                </select>
                {selectedPage && (
                  <select id="flow-element" className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm">
                    {(selectedPage.elements || []).map((e:any)=> (<option key={e.id} value={e.id}>{e.type}</option>))}
                  </select>
                )}
                <button
                  className="rounded border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800"
                  onClick={() => {
                    const s = (document.getElementById('flow-source') as HTMLSelectElement).value;
                    const t = (document.getElementById('flow-target') as HTMLSelectElement).value;
                    const kind = (document.getElementById('flow-source-kind') as HTMLSelectElement).value as 'page'|'element';
                    const elementId = (document.getElementById('flow-element') as HTMLSelectElement | null)?.value;
                    const source = kind === 'page' ? { kind: 'page', id: s } : { kind: 'element', id: elementId || '' };
                    if (source.id && t && source.id !== t) addEdge.mutate({ source, targetPageId: t });
                  }}
                >Add edge</button>
              </div>
              <FlowCanvas artboards={flowArtboards} edges={flow?.edges || []} />
              <div className="mt-2 text-sm text-neutral-300">
                {(flow?.edges || []).map((e:any)=> (
                  <div key={e.id} className="flex items-center justify-between border border-neutral-800 rounded px-2 py-1 mb-1">
                    <span>{e.source.id} → {e.targetPageId}</span>
                    <button className="rounded border border-neutral-700 px-2 py-0.5 text-xs hover:bg-neutral-800" onClick={()=>deleteEdge(e.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
        <aside className="hidden w-80 border-l border-neutral-800 p-3 lg:block" aria-label="Inspector">
          <div className="mb-3 text-xs uppercase text-neutral-400">Inspector</div>
          <div className="text-sm text-neutral-300">Select an element to edit props</div>
        </aside>
      </div>
    </div>
  );
}


