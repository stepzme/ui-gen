"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Folder, MoreVertical, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/components/dropdown-menu";
import { Button } from "@/app/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/ui/components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/components/select";
import { useMoveDocument, useWorkspaceProjects, usePersonalProject } from "@/hooks/api";

interface DocumentCardProps {
  id: string;
  name: string;
  projectName: string;
  projectId?: string;
  workspaceId?: string;
  lastEditedAt: Date | string;
  thumbnail?: string;
  canMove?: boolean; // Whether user is OWNER and can move the document
}

export function DocumentCard({ 
  id, 
  name, 
  projectName, 
  projectId,
  workspaceId,
  lastEditedAt, 
  thumbnail,
  canMove = false
}: DocumentCardProps) {
  const router = useRouter();
  const moveDocument = useMoveDocument();
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  const { data: personalProject } = usePersonalProject(workspaceId);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  
  const date = typeof lastEditedAt === 'string' ? new Date(lastEditedAt) : lastEditedAt;
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  const projects = (projectsData as { items?: any[] })?.items || [];
  const allProjects = personalProject 
    ? [{ id: (personalProject as any).id, name: "Drafts", isPersonal: true }, ...projects]
    : projects;

  const handleProjectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (projectId && workspaceId) {
      router.push(`/workspace/${workspaceId}/project/${projectId}`);
    }
  };

  const handleCardClick = () => {
    router.push(`/document/${id}`);
  };

  const handleMenuAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === "move") {
      setShowMoveDialog(true);
    } else {
      // TODO: Implement other menu actions
      console.log(action);
    }
  };

  const handleMoveDocument = async () => {
    if (!selectedProjectId || selectedProjectId === projectId) {
      setShowMoveDialog(false);
      return;
    }
    try {
      await moveDocument.mutateAsync({ documentId: id, projectId: selectedProjectId });
      setShowMoveDialog(false);
      setSelectedProjectId("");
    } catch (err) {
      console.error("Failed to move document:", err);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer rounded-lg border border-border bg-card p-3 transition-all hover:border-ring hover:shadow-sm"
    >
      {/* Document name */}
      <div className="flex items-center justify-between">
      <h3 className="mb-2 truncate text-sm font-medium text-foreground">
        {name}
      </h3>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
              aria-label="Document actions"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            {canMove && (
              <DropdownMenuItem onClick={(e) => handleMenuAction(e, "move")}>
                Move to Project
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={(e) => handleMenuAction(e, "rename")}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => handleMenuAction(e, "duplicate")}>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => handleMenuAction(e, "delete")}
              className="text-destructive focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Move Document Dialog */}
      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Move Document to Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">
                Select Project
              </label>
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a project" />
                </SelectTrigger>
                <SelectContent>
                  {allProjects.map((project: any) => (
                    <SelectItem 
                      key={project.id} 
                      value={project.id}
                      disabled={project.id === projectId}
                    >
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowMoveDialog(false);
                  setSelectedProjectId("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleMoveDocument}
                disabled={!selectedProjectId || selectedProjectId === projectId || moveDocument.isPending}
              >
                {moveDocument.isPending ? "Moving..." : "Move"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header with project icon and menu */}
      <div className="mb-2 flex items-center justify-between">
        {projectId && workspaceId ? (
          <button
            onClick={handleProjectClick}
            className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label={`Go to ${projectName} project`}
          >
            <Folder className="h-3.5 w-3.5" />
            <span className="truncate text-xs flex-1 min-w-0">{projectName}</span>
          </button>
        ) : (
          <div className="h-6 w-6" />
        )}
      </div>

      {/* Preview */}
      <div className="mb-3 aspect-video w-full rounded-md bg-secondary flex items-center justify-center overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={name} 
            className="h-full w-full object-cover" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <FileText className="h-8 w-8" />
            <span className="text-xs">No preview</span>
          </div>
        )}
      </div>

      {/* Footer with project name and time */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="ml-2 shrink-0">{timeAgo}</span>
      </div>
    </div>
  );
}

