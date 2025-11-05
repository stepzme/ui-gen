"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useWorkspaces, useRecentDocuments, useWorkspaceProjects } from "@/hooks/api";
import { DocumentCard } from "@/ui/document-card";
import { ProjectCard } from "@/ui/project-card";
import { Sidebar } from "@/components/sidebar";

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const workspaceId = params.id as string;
  
  const { data: workspaces } = useWorkspaces();
  const { data: recentData } = useRecentDocuments(workspaceId, 16, 0);
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  
  const [activeSection, setActiveSection] = useState<"recent" | "projects">("recent");
  
  const currentWorkspace = workspaces?.items?.find((w: any) => w.id === workspaceId);
  const recent = recentData?.items || [];
  const projects = projectsData?.items || [];

  return (
    <div className="flex h-screen bg-neutral-950">
      <Sidebar workspaceId={workspaceId} activeSection={activeSection} onSectionChange={setActiveSection} />

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

