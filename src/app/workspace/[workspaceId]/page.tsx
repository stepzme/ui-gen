"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useWorkspaces, useRecentDocuments, useWorkspaceProjects, useCreateProject } from "@/hooks/api";
import { useTheme } from "@/hooks/use-theme";
import { DocumentCard } from "@/features/documents/components/document-card";
import { ProjectCard } from "@/features/workspace/components/project-card";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button/button";
import { ButtonIcon } from "@/components/ui/buttonIcon/buttonIcon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const workspaceId = params.workspaceId as string;
  const { isDark, toggleTheme } = useTheme();
  
  const { data: workspaces } = useWorkspaces();
  const createProject = useCreateProject();
  const [recentOffset, setRecentOffset] = useState(0);
  const [allRecent, setAllRecent] = useState<any[]>([]);
  const { data: recentData } = useRecentDocuments(workspaceId, 16, recentOffset);
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  
  const [activeSection, setActiveSection] = useState<"recent" | "projects">("recent");
  const [projectName, setProjectName] = useState("");
  const [showCreateProject, setShowCreateProject] = useState(false);
  
  const currentWorkspace = workspaces?.items?.find((w: any) => w.id === workspaceId);
  
  // Accumulate recent documents when loading more
  useEffect(() => {
    if (recentData?.items) {
      if (recentOffset === 0) {
        setAllRecent(recentData.items);
      } else {
        setAllRecent(prev => [...prev, ...recentData.items]);
      }
    }
  }, [recentData, recentOffset]);
  
  const recent = allRecent;
  const hasMoreRecent = recentData?.hasMore || false;
  const projects = projectsData?.items || [];

  const handleCreateProject = async () => {
    if (!projectName.trim() || !workspaceId) return;
    try {
      const project = await createProject.mutateAsync({ name: projectName.trim(), workspaceId });
      setProjectName("");
      setShowCreateProject(false);
      router.push(`/workspace/${workspaceId}/project/${project.id}`);
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  return (
    <div className="flex h-screen bg-background-primary">
      <Sidebar workspaceId={workspaceId} activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 bg-background0-primary overflow-auto">
        <div className="w-full mx-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-x4">
              <h1 className="text-2xl font-semibold text-foreground-primary">
                {activeSection === "recent" ? "Recent Documents" : "Projects"}
              </h1>
              {activeSection === "projects" && (
                <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
                  <DialogTrigger asChild>
                    <Button>Create Project</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background-primary border-border-secondary">
                    <DialogHeader>
                      <DialogTitle className="text-foreground-primary">Create Project</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-foreground-secondary">
                          Project Name
                        </label>
                        <Input
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="My Project"
                          className="bg-background-secondary border-border-primary text-foreground-primary"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => setShowCreateProject(false)}
                          className="border-border-primary text-foreground-secondary hover:bg-background-secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreateProject}
                          disabled={!projectName.trim() || createProject.isPending}
                          className="bg-foreground-inverted text-background-inverted hover:bg-background-secondary hover:text-foreground-primary"
                        >
                          {createProject.isPending ? "Creating..." : "Create"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
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
          
          {activeSection === "recent" && (
            <div>
              {recent.length === 0 ? (
                <div className="text-center py-12 text-foreground-secondary">
                  <p>No recent documents</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x10">
                    {recent.map((doc: any) => (
                      <DocumentCard
                        key={doc.id}
                        id={doc.id}
                        name={doc.name}
                        projectName={doc.projectName}
                        lastEditedAt={doc.lastEditedAt}
                      />
                    ))}
                  </div>
                  {hasMoreRecent && (
                    <div className="mt-6 text-center">
                      <Button
                        onClick={() => setRecentOffset(prev => prev + 16)}
                        variant="secondary"
                        className="border-border-primary text-foreground-secondary hover:bg-background-secondary"
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
                <div className="text-center py-12 text-foreground-secondary">
                  <p className="mb-4">No projects yet</p>
                  <p className="text-sm">Use the button above to create your first project</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x10">
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
  );
}
