"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Folder, MoreVertical, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/components/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/ui/components/dialog";
import { Button } from "@/app/ui/components/button";
import { useToggleFavorite, useDeleteProject } from "@/hooks/api";

interface ProjectCardProps {
  id: string;
  name: string;
  documentCount: number;
  owner: string;
  isFavorite?: boolean;
  canDelete?: boolean;
  isPersonal?: boolean;
}

export function ProjectCard({ id, name, documentCount, owner, workspaceId, isFavorite = false, canDelete = false, isPersonal = false }: ProjectCardProps & { workspaceId: string }) {
  const router = useRouter();
  const toggleFavorite = useToggleFavorite();
  const deleteProject = useDeleteProject();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleCardClick = () => {
    router.push(`/workspace/${workspaceId}/project/${id}`);
  };

  const handleMenuAction = async (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === "favorite") {
      await toggleFavorite.mutateAsync({
        entityType: "PROJECT",
        entityId: id,
        isFavorite,
        entityName: name,
      });
    } else if (action === "delete") {
      setShowDeleteDialog(true);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject.mutateAsync({ projectId: id, projectName: name });
      setShowDeleteDialog(false);
      router.push(`/workspace/${workspaceId}?section=projects`);
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col justify-end cursor-pointer h-64 rounded-lg border border-border bg-card p-4 transition-all hover:bg-accent relative"
    >
      <div className="absolute top-3 right-3">
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 transition-opacity ${dropdownOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              onClick={(e) => e.stopPropagation()}
              aria-label="Project actions"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            {!isPersonal && (
              <DropdownMenuItem onClick={(e) => handleMenuAction(e, "favorite")}>
                <Star className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </DropdownMenuItem>
            )}
            {canDelete && !isPersonal && (
              <DropdownMenuItem 
                onClick={(e) => handleMenuAction(e, "delete")}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete "{name}"? This will delete all documents in this project. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteProject}
                disabled={deleteProject.isPending}
                variant="destructive"
              >
                {deleteProject.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <h3 className="mb-1 truncate text-sm font-medium text-foreground">
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{documentCount} {documentCount === 1 ? 'document' : 'documents'}</span>
      </div>
    </div>
  );
}

