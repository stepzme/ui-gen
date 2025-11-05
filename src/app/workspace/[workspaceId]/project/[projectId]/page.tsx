"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useWorkspaceProjects, useCreateDocument, useProjectDocuments } from "@/hooks/api";
import { DocumentCard } from "@/ui/document-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog/dialog";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  const projectId = params.projectId as string;
  
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  const { data: documentsData } = useProjectDocuments(projectId);
  const createDocument = useCreateDocument();
  
  const [documentName, setDocumentName] = useState("");
  const [showCreateDocument, setShowCreateDocument] = useState(false);
  
  const project = projectsData?.items?.find((p: any) => p.id === projectId);
  const documents = documentsData?.items || [];
  
  const handleCreateDocument = async () => {
    if (!documentName.trim() || !projectId) return;
    try {
      const slug = documentName.trim().toLowerCase().replace(/\s+/g, "-");
      const doc = await createDocument.mutateAsync({
        projectId,
        name: documentName.trim(),
        slug,
      });
      setDocumentName("");
      setShowCreateDocument(false);
      // Open document in new tab
      window.open(`/document/${doc.id}`, "_blank");
    } catch (err) {
      console.error("Failed to create document:", err);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-950">
      {/* Sidebar - same as workspace dashboard */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900 flex flex-col">
        <div className="p-4 border-b border-neutral-800">
          <button
            onClick={() => router.push(`/workspace/${workspaceId}`)}
            className="text-sm text-neutral-400 hover:text-neutral-50"
          >
            ← Back to Workspace
          </button>
        </div>
        {/* TODO: Add same sidebar navigation */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => router.push(`/workspace/${workspaceId}`)}
              className="text-neutral-400 hover:text-neutral-50"
            >
              ←
            </button>
            <h1 className="text-2xl font-semibold text-neutral-50">
              {project?.name || "Project"}
            </h1>
          </div>
          
          {documents.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <p className="mb-4">No documents yet</p>
              <Dialog open={showCreateDocument} onOpenChange={setShowCreateDocument}>
                <DialogTrigger asChild>
                  <Button>Create Document</Button>
                </DialogTrigger>
                <DialogContent className="bg-neutral-900 border-neutral-800">
                  <DialogHeader>
                    <DialogTitle className="text-neutral-50">Create Document</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-neutral-300">
                        Document Name
                      </label>
                      <Input
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder="My Document"
                        className="bg-neutral-800 border-neutral-700 text-neutral-50"
                        autoFocus
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateDocument(false)}
                        className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateDocument}
                        disabled={!documentName.trim() || createDocument.isPending}
                        className="bg-neutral-50 text-neutral-950 hover:bg-neutral-200"
                      >
                        {createDocument.isPending ? "Creating..." : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-end">
                <Dialog open={showCreateDocument} onOpenChange={setShowCreateDocument}>
                  <DialogTrigger asChild>
                    <Button>Create Document</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-neutral-900 border-neutral-800">
                    <DialogHeader>
                      <DialogTitle className="text-neutral-50">Create Document</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-300">
                          Document Name
                        </label>
                        <Input
                          value={documentName}
                          onChange={(e) => setDocumentName(e.target.value)}
                          placeholder="My Document"
                          className="bg-neutral-800 border-neutral-700 text-neutral-50"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowCreateDocument(false)}
                          className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreateDocument}
                          disabled={!documentName.trim() || createDocument.isPending}
                          className="bg-neutral-50 text-neutral-950 hover:bg-neutral-200"
                        >
                          {createDocument.isPending ? "Creating..." : "Create"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {documents.map((doc: any) => (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    name={doc.name}
                    projectName={project?.name || ""}
                    lastEditedAt={doc.updatedAt}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

