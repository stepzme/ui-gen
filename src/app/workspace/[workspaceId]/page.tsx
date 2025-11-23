"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useWorkspaces, useRecentDocuments, useWorkspaceProjects, useCreateProject } from "@/hooks/api";
import { DocumentCard } from "@/features/documents/components/document-card";
import { ProjectCard } from "@/features/workspace/components/project-card";
import { Header } from "@/features/workspace/components/header";
import { Sidebar } from "@/app/ui/sidebar";
import { Button } from "@/app/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/ui/components/dialog";
import { Input } from "@/app/ui/components/input";

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = params.workspaceId as string;
  
  const { data: workspaces } = useWorkspaces();
  const createProject = useCreateProject();
  const [recentOffset, setRecentOffset] = useState(0);
  const [allRecent, setAllRecent] = useState<any[]>([]);
  const { data: recentData } = useRecentDocuments(workspaceId, 16, recentOffset);
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  
  // Initialize activeSection from URL query param or default to "recent"
  const sectionParam = searchParams.get("section");
  const [activeSection, setActiveSection] = useState<"recent" | "projects">(
    sectionParam === "projects" ? "projects" : "recent"
  );
  
  // Update activeSection when URL changes
  useEffect(() => {
    const section = searchParams.get("section");
    if (section === "projects") {
      setActiveSection("projects");
    } else if (section === "recent" || !section) {
      setActiveSection("recent");
    }
  }, [searchParams]);
  const [projectName, setProjectName] = useState("");
  const [showCreateProject, setShowCreateProject] = useState(false);
  
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

  const handleSectionChange = (section: "recent" | "projects" | "drafts") => {
    if (section === "drafts") {
      // Drafts navigation is handled by Sidebar component itself
      return;
    }
    setActiveSection(section);
    // Update URL without page reload
    const newUrl = section === "projects" 
      ? `/workspace/${workspaceId}?section=projects`
      : `/workspace/${workspaceId}`;
    router.push(newUrl);
  };

  return (
    <div className="flex h-screen">
      <Sidebar workspaceId={workspaceId} activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header workspaceId={workspaceId} />
        <main className="flex-1 bg-muted/30 overflow-auto">
          <div className="w-full max-w-[1600px] mx-auto p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-foreground">
                  {activeSection === "recent" ? "Recent Documents" : "Projects"}
                </h1>
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
            </div>
          
          {activeSection === "recent" && (
            <div>
              {recent.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No recent documents</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                </>
              )}
            </div>
          )}
          
          {activeSection === "projects" && (
            <div>
              {projects.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="mb-2 text-base">No projects yet</p>
                  <p className="text-sm">Use the button above to create your first project</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {projects.map((project: any) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      name={project.name}
                      documentCount={project.documentCount}
                      owner={project.owner}
                      workspaceId={workspaceId}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}
