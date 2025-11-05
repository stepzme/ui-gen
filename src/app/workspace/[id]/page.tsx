"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useWorkspaces, useRecentDocuments, useWorkspaceProjects, useCreateProject } from "@/hooks/api";
import { DocumentCard } from "@/ui/document-card";
import { ProjectCard } from "@/ui/project-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog/dialog";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const workspaceId = params.id as string;
  
  const { data: workspaces } = useWorkspaces();
  const { data: recentData } = useRecentDocuments(workspaceId, 16, 0);
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  const createProject = useCreateProject();
  
  const [projectName, setProjectName] = useState("");
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [activeSection, setActiveSection] = useState<"recent" | "projects">("recent");
  
  const currentWorkspace = workspaces?.items?.find((w: any) => w.id === workspaceId);
  const recent = recentData?.items || [];
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
    <div className="flex h-screen bg-neutral-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900 flex flex-col">
        <div className="p-4 border-b border-neutral-800">
          <select
            value={workspaceId}
            onChange={(e) => router.push(`/workspace/${e.target.value}`)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-700"
          >
            {workspaces?.items?.map((ws: any) => (
              <option key={ws.id} value={ws.id}>{ws.name}</option>
            ))}
          </select>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection("recent")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              activeSection === "recent"
                ? "bg-neutral-800 text-neutral-50"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50"
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setActiveSection("projects")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              activeSection === "projects"
                ? "bg-neutral-800 text-neutral-50"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50"
            }`}
          >
            Projects
          </button>
        </nav>
        
        <div className="p-4 border-t border-neutral-800">
          <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
            <DialogTrigger asChild>
              <Button className="w-full">Create Project</Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 border-neutral-800">
              <DialogHeader>
                <DialogTitle className="text-neutral-50">Create Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-300">
                    Project Name
                  </label>
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="My Project"
                    className="bg-neutral-800 border-neutral-700 text-neutral-50"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateProject(false)}
                    className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProject}
                    disabled={!projectName.trim() || createProject.isPending}
                    className="bg-neutral-50 text-neutral-950 hover:bg-neutral-200"
                  >
                    {createProject.isPending ? "Creating..." : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-2xl font-semibold text-neutral-50 mb-6">
            {currentWorkspace?.name || "Workspace"}
          </h1>
          
          {activeSection === "recent" && (
            <div>
              <h2 className="text-lg font-medium text-neutral-400 mb-4">Recent Documents</h2>
              {recent.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <p>No recent documents</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
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
              )}
            </div>
          )}
          
          {activeSection === "projects" && (
            <div>
              <h2 className="text-lg font-medium text-neutral-400 mb-4">Projects</h2>
              {projects.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <p className="mb-4">No projects yet</p>
                  <Button onClick={() => setShowCreateProject(true)}>Create Project</Button>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
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

