"use client";

import { useRouter } from "next/navigation";
import { useWorkspaces, usePersonalProject, useCreateDocument } from "@/hooks/api";
import { Clock, Folder, FileText, Plus } from "lucide-react";
import { Button } from "@/app/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/components/select";
import { Avatar, AvatarFallback } from "@/app/ui/components/avatar";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/components/dialog";
import { Input } from "@/app/ui/components/input";

interface SidebarProps {
  workspaceId: string;
  activeSection?: "recent" | "projects" | "drafts";
  onSectionChange?: (section: "recent" | "projects" | "drafts") => void;
}

export function Sidebar({ workspaceId, activeSection = "recent", onSectionChange }: SidebarProps) {
  const router = useRouter();
  const { data: workspaces } = useWorkspaces();
  const { data: personalProject } = usePersonalProject(workspaceId);
  const createDocument = useCreateDocument();
  const [selectOpen, setSelectOpen] = useState(false);
  const [showCreateDocument, setShowCreateDocument] = useState(false);
  const [documentName, setDocumentName] = useState("");

  const handleCreateWorkspace = () => {
    router.push("/workspace/new");
  };

  const handleValueChange = (value: string) => {
    if (value === "__create__") {
      handleCreateWorkspace();
    } else {
      router.push(`/workspace/${value}`);
    }
    setSelectOpen(false);
  };

  const handleDraftsClick = () => {
    if (personalProject) {
      router.push(`/workspace/${workspaceId}/project/${personalProject.id}`);
    }
  };

  const handleCreateDocument = async () => {
    if (!documentName.trim() || !personalProject) return;
    try {
      const slug = documentName.trim().toLowerCase().replace(/\s+/g, "-");
      const doc = await createDocument.mutateAsync({
        projectId: personalProject.id,
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

  const currentWorkspace = workspaces?.items?.find((ws: any) => ws.id === workspaceId);

  return (
    <aside className="w-80 p-4 bg-muted/30 flex flex-col space-y-4">
      <nav className="flex-1 bg-background border border-border rounded-xl p-4 space-y-2">
        <p className="text-sm font-medium text-foreground">Workspace</p>
        <Select value={workspaceId} onValueChange={handleValueChange} open={selectOpen} onOpenChange={setSelectOpen}>
          <SelectTrigger className="w-full">
            {currentWorkspace ? (
              <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarFallback className="text-xs">
                    {currentWorkspace.name?.charAt(0)?.toUpperCase() || "W"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground truncate">
                  {currentWorkspace.name}
                </span>
              </div>
            ) : (
              <SelectValue placeholder="Select workspace" />
            )}
          </SelectTrigger>
          <SelectContent>
            {workspaces?.items?.map((ws: any) => (
              <SelectItem key={ws.id} value={ws.id}>
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-sm">
                      {ws.name?.charAt(0)?.toUpperCase() || "W"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {ws.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ws.projectCount || 0} {ws.projectCount === 1 ? 'project' : 'projects'}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
            <SelectSeparator />
            <div className="p-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  handleCreateWorkspace();
                  setSelectOpen(false);
                }}
              >
                Create workspace
              </Button>
            </div>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            if (onSectionChange) {
              onSectionChange("recent");
            } else {
              router.push(`/workspace/${workspaceId}`);
            }
          }}
          variant={activeSection === "recent" ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <Clock className="h-4 w-4" />
          Recent
        </Button>
        <Button
          onClick={handleDraftsClick}
          variant={activeSection === "drafts" ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <FileText className="h-4 w-4" />
          Drafts
        </Button>
        <Button
          onClick={() => {
            if (onSectionChange) {
              onSectionChange("projects");
            }
          }}
          variant={activeSection === "projects" ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <Folder className="h-4 w-4" />
          Projects
        </Button>
      </nav>
      <div className="bg-background border border-border rounded-xl p-4">
        <Dialog open={showCreateDocument} onOpenChange={setShowCreateDocument}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
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
      </div>
    </aside>
  );
}

