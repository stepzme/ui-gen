"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreatePage, useDocumentPages } from "@/src/hooks/api";
import { PageListItem } from "@/src/ui/page-list-item";

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
  const mode = (search.get("mode") as Mode) || "pages";
  const device = (search.get("device") as Device) || "desktop";

  function setQuery(key: string, value: string) {
    const sp = new URLSearchParams(search.toString());
    sp.set(key, value);
    router.replace(`/${params.workspace}/${params.project}/${params.document}?${sp.toString()}`);
  }

  const headerTitle = useMemo(() => `${params.document}`, [params.document]);
  const { data } = useDocumentPages(params.document);
  const createPage = useCreatePage(params.document);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  function handleCreatePage() {
    const count = (data?.items?.length || 0) + 1;
    createPage.mutate({ name: `Untitled ${count}`, device: device });
  }

  const selectedPage = useMemo(() => data?.items?.find((p: any) => p.id === selectedPageId), [data, selectedPageId]);

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
                onClick={() => setQuery("mode", m)}
                className={`px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${mode === m ? "bg-neutral-800" : "bg-transparent"}`}
                tabIndex={0}
                aria-label={`Switch to ${m} mode`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setQuery("mode", m);
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
                  onClick={() => setQuery("device", d)}
                  className={`px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${device === d ? "bg-neutral-800" : "bg-transparent"}`}
                  tabIndex={0}
                  aria-label={`Switch to ${d}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setQuery("device", d);
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
                onSelect={setSelectedPageId}
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
          </div>
        </aside>
        <main className="flex-1 p-4" aria-live="polite">
          {mode === "pages" ? (
            <div className="grid place-items-center rounded border border-neutral-800 p-8 text-neutral-400">
              <div className="text-sm">Pages canvas placeholder ({device})</div>
            </div>
          ) : (
            <div className="grid place-items-center rounded border border-neutral-800 p-8 text-neutral-400">
              <div className="text-sm">Flow map placeholder</div>
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


