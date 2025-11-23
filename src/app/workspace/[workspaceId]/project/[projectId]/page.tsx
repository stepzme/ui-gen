"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useWorkspaceProjects, useCreateDocument, useProjectDocuments, usePersonalProject } from "@/hooks/api";
import { DocumentCard } from "@/features/documents/components/document-card";
import { Header } from "@/features/workspace/components/header";
import { Sidebar } from "@/app/ui/sidebar";
import { Button } from "@/app/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/ui/components/dialog";
import { Input } from "@/app/ui/components/input";
import { ArrowLeft } from "lucide-react";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  const projectId = params.projectId as string;
  
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  const { data: documentsData } = useProjectDocuments(projectId);
  const { data: personalProject } = usePersonalProject(workspaceId);
  const createDocument = useCreateDocument();
  
  const [documentName, setDocumentName] = useState("");
  const [showCreateDocument, setShowCreateDocument] = useState(false);
  
  const projectsDataTyped = projectsData as { items?: any[] } | undefined;
  const documentsDataTyped = documentsData as { items?: any[] } | undefined;
  const personalProjectTyped = personalProject as { id?: string } | undefined;
  
  const project = projectsDataTyped?.items?.find((p: any) => p.id === projectId);
  const documents = documentsDataTyped?.items || [];
  
  // Check if this is the personal project (Drafts)
  const isPersonalProject = personalProjectTyped?.id === projectId;
  const displayName = isPersonalProject ? "Drafts" : (project?.name || "Project");
  const activeSection = isPersonalProject ? "drafts" : "projects";
  
  const handleCreateDocument = async () => {
    if (!documentName.trim() || !projectId) return;
    try {
      const slug = documentName.trim().toLowerCase().replace(/\s+/g, "-");
      const doc = await createDocument.mutateAsync({
        projectId,
        name: documentName.trim(),
        slug,
      }) as { id: string };
      setDocumentName("");
      setShowCreateDocument(false);
      // Open document in new tab
      window.open(`/document/${doc.id}`, "_blank");
    } catch (err) {
      console.error("Failed to create document:", err);
    }
  };

  const handleSectionChange = (section: "recent" | "projects" | "drafts") => {
    if (section === "recent") {
      router.push(`/workspace/${workspaceId}`);
    } else if (section === "projects") {
      // Navigate to workspace page with projects section active
      router.push(`/workspace/${workspaceId}?section=projects`);
    } else if (section === "drafts" && personalProjectTyped?.id) {
      router.push(`/workspace/${workspaceId}/project/${personalProjectTyped.id}`);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar workspaceId={workspaceId} activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header workspaceId={workspaceId} />
        <main className="flex-1 overflow-auto bg-muted/30">
          <div className="w-full max-w-[1600px] mx-auto p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              {!isPersonalProject && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/workspace/${workspaceId}`)}
                  className="h-9 w-9"
                  aria-label="Back to workspace"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <h1 className="text-2xl font-semibold text-foreground">
                {displayName}
              </h1>
              <Dialog open={showCreateDocument} onOpenChange={setShowCreateDocument}>
                <DialogTrigger asChild>
                  <Button>Create Document</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Document</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-muted-foreground">
                        Document Name
                      </label>
                      <Input
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder="My Document"
                        className="w-full"
                        autoFocus
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateDocument(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateDocument}
                        disabled={!documentName.trim() || createDocument.isPending}
                      >
                        {createDocument.isPending ? "Creating..." : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          
          {documents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-2 text-base">No documents yet</p>
              <p className="text-sm">Use the button above to create your first document</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {documents.map((doc: any) => (
                <DocumentCard
                  key={doc.id}
                  id={doc.id}
                  name={doc.name}
                  projectName={displayName}
                  projectId={projectId}
                  workspaceId={workspaceId}
                  lastEditedAt={doc.updatedAt}
                  canMove={doc.canMove}
                />
              ))}
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}
