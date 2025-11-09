"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useWorkspaceProjects, useCreateDocument, useProjectDocuments } from "@/hooks/api";
import { useTheme } from "@/hooks/use-theme";
import { DocumentCard } from "@/features/documents/components/document-card";
import { Sidebar } from "@/components/layout/sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";
import { ButtonIcon } from "@/components/ui/buttonIcon/buttonIcon";
import { Input } from "@/components/ui/input/input";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  const projectId = params.projectId as string;
  const { isDark, toggleTheme } = useTheme();
  
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

  const handleSectionChange = (section: "recent" | "projects") => {
    if (section === "recent") {
      router.push(`/workspace/${workspaceId}`);
    }
    // If "projects", stay on current page
  };

  return (
    <div className="flex h-screen bg-background0-primary">
      <Sidebar workspaceId={workspaceId} activeSection="projects" onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="w-full mx-auto p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-x4">
              <button
                onClick={() => router.push(`/workspace/${workspaceId}`)}
                className="text-foreground-secondary hover:text-foreground-primary"
              >
                ←
              </button>
              <h1 className="text-2xl font-semibold text-foreground-primary">
                {project?.name || "Project"}
              </h1>
              <Dialog open={showCreateDocument} onOpenChange={setShowCreateDocument}>
                <DialogTrigger asChild>
                  <Button>Create Document</Button>
                </DialogTrigger>
                <DialogContent className="bg-background-primary border-border-secondary">
                  <DialogHeader>
                    <DialogTitle className="text-foreground-primary">Create Document</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground-secondary">
                        Document Name
                      </label>
                      <Input
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder="My Document"
                        className="bg-background-secondary border-border-primary text-foreground-primary"
                        autoFocus
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setShowCreateDocument(false)}
                        className="border-border-primary text-foreground-secondary hover:bg-background-secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateDocument}
                        disabled={!documentName.trim() || createDocument.isPending}
                        className="bg-foreground-inverted text-background-inverted hover:bg-background-secondary hover:text-foreground-primary"
                      >
                        {createDocument.isPending ? "Creating..." : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center gap-x2">
              <ButtonIcon
                icon={isDark ? "flashlight_on" : "flashlight_off"}
                variant="text"
                semantic="default"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              />
              <ButtonIcon
                icon="door_arrow_right"
                variant="text"
                semantic="default"
                onClick={() => signOut({ callbackUrl: "/login" })}
                aria-label="Log out"
                title="Log out"
              />
            </div>
          </div>
          
          {documents.length === 0 ? (
            <div className="text-center py-12 text-foreground-secondary">
              <p className="mb-4">No documents yet</p>
              <p className="text-sm">Use the button above to create your first document</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x10">
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
          )}
        </div>
      </main>
    </div>
  );
}
