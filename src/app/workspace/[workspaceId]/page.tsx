"use client";

import { useState, useEffect, useTransition } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useWorkspaces, useRecentDocuments, useWorkspaceProjects, useCreateProject, usePersonalProject, useCreateDocument, useProjectDocuments } from "@/hooks/api";
import { DocumentCard } from "@/features/documents/components/document-card";
import { ProjectCard } from "@/features/workspace/components/project-card";
import { Header } from "@/features/workspace/components/header";
import { Sidebar } from "@/app/ui/sidebar";
import { Button } from "@/app/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/ui/components/dialog";
import { Input } from "@/app/ui/components/input";
import { Spinner } from "@/app/ui/spinner";
import { DocumentCardSkeleton } from "@/features/documents/components/document-card-skeleton";
import { ProjectCardSkeleton } from "@/features/workspace/components/project-card-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/app/ui/empty";
import { FileText, Folder } from "lucide-react";

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const workspaceId = params.workspaceId as string;
  
  const { data: workspaces } = useWorkspaces();
  const createProject = useCreateProject();
  const { data: personalProject } = usePersonalProject(workspaceId);
  const createDocument = useCreateDocument();
  const [recentOffset, setRecentOffset] = useState(0);
  const [allRecent, setAllRecent] = useState<any[]>([]);
  
  // Initialize activeSection from URL query param or default to "recent"
  const sectionParam = searchParams.get("section");
  const [activeSection, setActiveSection] = useState<"recent" | "projects" | "drafts">(
    sectionParam === "projects" ? "projects" : sectionParam === "drafts" ? "drafts" : "recent"
  );
  
  const { data: recentData, isLoading: isLoadingRecent } = useRecentDocuments(workspaceId, 16, recentOffset);
  const { data: projectsData, isLoading: isLoadingProjects } = useWorkspaceProjects(workspaceId);
  const personalProjectTyped = personalProject as { id?: string } | undefined;
  const draftsProjectId = personalProjectTyped?.id;
  const { data: draftsData, isLoading: isLoadingDrafts } = useProjectDocuments(
    activeSection === "drafts" ? draftsProjectId : undefined
  );
  
  // Update activeSection when URL changes
  useEffect(() => {
    const section = searchParams.get("section");
    if (section === "projects") {
      setActiveSection("projects");
    } else if (section === "drafts") {
      setActiveSection("drafts");
    } else if (section === "recent" || !section) {
      setActiveSection("recent");
    }
  }, [searchParams]);
  const [projectName, setProjectName] = useState("");
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [showCreateDocument, setShowCreateDocument] = useState(false);
  
  const currentWorkspace = workspaces?.items?.find((w: any) => w.id === workspaceId);
  
  // Accumulate recent documents when loading more
  useEffect(() => {
    const data = recentData as { items?: any[] } | undefined;
    if (data?.items) {
      if (recentOffset === 0) {
        setAllRecent(data.items);
      } else {
        setAllRecent(prev => [...prev, ...data.items!]);
      }
    }
  }, [recentData, recentOffset]);
  
  const recent = allRecent;
  const recentDataTyped = recentData as { hasMore?: boolean } | undefined;
  const hasMoreRecent = recentDataTyped?.hasMore || false;
  const projectsDataTyped = projectsData as { items?: any[] } | undefined;
  const projects = projectsDataTyped?.items || [];
  const draftsDataTyped = draftsData as { items?: any[] } | undefined;
  const drafts = draftsDataTyped?.items || [];

  const handleCreateProject = async () => {
    if (!projectName.trim() || !workspaceId) return;
    try {
      const project = await createProject.mutateAsync({ name: projectName.trim(), workspaceId }) as { id: string };
      setProjectName("");
      setShowCreateProject(false);
      router.push(`/workspace/${workspaceId}/project/${project.id}`);
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  const handleCreateDocument = async () => {
    if (!documentName.trim() || !personalProject || typeof personalProject !== 'object' || !('id' in personalProject)) return;
    try {
      const slug = documentName.trim().toLowerCase().replace(/\s+/g, "-");
      const doc = await createDocument.mutateAsync({
        projectId: personalProject.id as string,
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
    startTransition(() => {
      setActiveSection(section);
      // Update URL without page reload
      let newUrl = `/workspace/${workspaceId}`;
      if (section === "projects") {
        newUrl += "?section=projects";
      } else if (section === "drafts") {
        newUrl += "?section=drafts";
      }
      router.push(newUrl);
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar workspaceId={workspaceId} activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header workspaceId={workspaceId} />
        <main className="flex-1 overflow-auto">
          <div className="w-full mx-auto p-4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground">
                    {activeSection === "recent" ? "Recent Documents" : activeSection === "drafts" ? "Drafts" : "Projects"}
                  </h1>
                  <AnimatePresence>
                    {(isLoadingRecent || isLoadingProjects || isLoadingDrafts) && (
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
                {activeSection === "projects" && (
                  <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
                    <DialogTrigger asChild>
                      <Button>Create Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Project</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-muted-foreground">
                            Project Name
                          </label>
                          <Input
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="My Project"
                            className="w-full"
                            autoFocus
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowCreateProject(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCreateProject}
                            disabled={!projectName.trim() || createProject.isPending}
                          >
                            {createProject.isPending ? "Creating..." : "Create"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {(activeSection === "recent" || activeSection === "drafts") && (
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
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && documentName.trim()) {
                                handleCreateDocument();
                              }
                            }}
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
                )}
            </div>
          
          {activeSection === "recent" && (
            <div className="relative">
              <AnimatePresence mode="wait">
                {isLoadingRecent ? (
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
                ) : recent.length === 0 ? (
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
                        <EmptyTitle>No recent documents</EmptyTitle>
                        <EmptyDescription>
                          Documents you've recently viewed will appear here.
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
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                      {recent.map((doc: any) => (
                        <DocumentCard
                          key={doc.id}
                          id={doc.id}
                          name={doc.name}
                          projectName={doc.projectName}
                          projectId={doc.projectId}
                          workspaceId={workspaceId}
                          lastEditedAt={doc.lastEditedAt}
                          canMove={doc.canMove}
                          isFavorite={doc.isFavorite}
                        />
                      ))}
                    </div>
                    {hasMoreRecent && (
                      <div className="mt-8 text-center">
                        <Button
                          onClick={() => setRecentOffset(prev => prev + 16)}
                          variant="outline"
                        >
                          Show More
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {activeSection === "drafts" && (
            <div className="relative">
              <AnimatePresence mode="wait">
                {isLoadingDrafts ? (
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
                ) : drafts.length === 0 ? (
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
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                      {drafts.map((doc: any) => (
                        <DocumentCard
                          key={doc.id}
                          id={doc.id}
                          name={doc.name}
                          projectName="Drafts"
                          projectId={draftsProjectId || ""}
                          workspaceId={workspaceId}
                          lastEditedAt={doc.updatedAt}
                          canMove={doc.canMove}
                          isFavorite={doc.isFavorite}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {activeSection === "projects" && (
            <div className="relative">
              <AnimatePresence mode="wait">
                {isLoadingProjects ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <ProjectCardSkeleton key={i} />
                    ))}
                  </motion.div>
                ) : projects.length === 0 ? (
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
                          <Folder />
                        </EmptyMedia>
                        <EmptyTitle>No projects yet</EmptyTitle>
                        <EmptyDescription>
                          Use the button above to create your first project.
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
                    {projects.map((project: any) => (
                      <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        documentCount={project.documentCount}
                        owner={project.owner}
                        workspaceId={workspaceId}
                        isFavorite={project.isFavorite}
                        canDelete={project.canDelete}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}
