"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useWorkspaceProjects, useCreateDocument, useProjectDocuments, usePersonalProject } from "@/hooks/api";
import { DocumentCard } from "@/features/documents/components/document-card";
import { Header } from "@/features/workspace/components/header";
import { Sidebar } from "@/app/ui/sidebar";
import { Button } from "@/app/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/ui/components/dialog";
import { Input } from "@/app/ui/components/input";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/app/ui/spinner";
import { DocumentCardSkeleton } from "@/features/documents/components/document-card-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/app/ui/empty";
import { FileText } from "lucide-react";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  const projectId = params.projectId as string;
  
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  const { data: documentsData, isLoading: isLoadingDocuments } = useProjectDocuments(projectId);
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
  
  // Redirect personal project to workspace page with drafts section
  useEffect(() => {
    if (isPersonalProject) {
      router.replace(`/workspace/${workspaceId}?section=drafts`);
    }
  }, [isPersonalProject, workspaceId, router]);
  
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
        <main className="flex-1 overflow-auto">
          <div className="w-full mx-auto p-4">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">
                  {displayName}
                </h1>
                <AnimatePresence>
                  {isLoadingDocuments && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Spinner className="size-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </div>
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
          
          <div className="relative">
            <AnimatePresence mode="wait">
              {isLoadingDocuments ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <DocumentCardSkeleton key={i} />
                  ))}
                </motion.div>
              ) : documents.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <FileText />
                      </EmptyMedia>
                      <EmptyTitle>No documents yet</EmptyTitle>
                      <EmptyDescription>
                        Use the button above to create your first document.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
                >
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
                      isFavorite={doc.isFavorite}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
