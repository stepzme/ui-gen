"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateDocument, useCreateProject, useCreateWorkspace, useDocuments, useProjects, useWorkspaces } from "@/src/hooks/api";

export default function DashboardPage() {
  const router = useRouter();
  const { data: ws } = useWorkspaces();
  const { data: pr } = useProjects();
  const { data: docs } = useDocuments();
  const createWs = useCreateWorkspace();
  const createPr = useCreateProject();
  const createDoc = useCreateDocument();

  const [workspaceName, setWorkspaceName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  function handleCreateWorkspace() {
    if (!workspaceName.trim()) return;
    createWs.mutate({ name: workspaceName.trim() }, { onSuccess: () => setWorkspaceName("") });
  }

  function handleCreateProject() {
    if (!projectName.trim() || !workspaceId) return;
    createPr.mutate({ name: projectName.trim(), workspaceId }, { onSuccess: () => setProjectName("") });
  }

  function handleCreateDocument() {
    if (!documentName.trim() || !projectId) return;
    const slug = documentName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    createDoc.mutate({ name: documentName.trim(), projectId, slug }, {
      onSuccess: (doc: any) => {
        setDocumentName("");
        const project = (pr?.items || []).find((p: any) => p.id === projectId);
        const workspace = project ? (ws?.items || []).find((w: any) => w.id === project.workspaceId) : null;
        if (workspace && project && doc?.id) router.push(`/${workspace.id}/${project.id}/${doc.id}`);
      },
    });
  }

  return (
    <div className="mx-auto max-w-5xl p-6 text-neutral-50">
      <h1 className="mb-6 text-xl font-semibold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <section className="rounded border border-neutral-800 p-4">
          <h2 className="mb-2 text-sm font-medium text-neutral-300">Create Workspace</h2>
          <div className="flex gap-2">
            <input
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Workspace name"
              className="flex-1 rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Workspace name"
            />
            <button
              onClick={handleCreateWorkspace}
              className="rounded border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Create workspace"
            >Create</button>
          </div>
          <div className="mt-3 text-xs text-neutral-400">{(ws?.items || []).length} workspaces</div>
        </section>

        <section className="rounded border border-neutral-800 p-4">
          <h2 className="mb-2 text-sm font-medium text-neutral-300">Create Project</h2>
          <select
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
            className="mb-2 w-full rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Select workspace"
          >
            <option value="">Select workspace</option>
            {(ws?.items || []).map((w: any) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
              className="flex-1 rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Project name"
            />
            <button
              onClick={handleCreateProject}
              className="rounded border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Create project"
            >Create</button>
          </div>
          <div className="mt-3 text-xs text-neutral-400">{(pr?.items || []).length} projects</div>
        </section>

        <section className="rounded border border-neutral-800 p-4">
          <h2 className="mb-2 text-sm font-medium text-neutral-300">Create Document</h2>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="mb-2 w-full rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Select project"
          >
            <option value="">Select project</option>
            {(pr?.items || []).map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Document name"
              className="flex-1 rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Document name"
            />
            <button
              onClick={handleCreateDocument}
              className="rounded border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Create document"
            >Create & Open</button>
          </div>
          <div className="mt-3 text-xs text-neutral-400">{(docs?.items || []).length} documents</div>
        </section>
      </div>
    </div>
  );
}


