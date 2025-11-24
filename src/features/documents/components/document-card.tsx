"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Folder, MoreVertical, FileText, Star, Move, Pencil, Copy, Trash2 } from "lucide-react";
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
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import { useMoveDocument, useWorkspaceProjects, usePersonalProject, useToggleFavorite, useUpdateDocument, useDeleteDocument, useDuplicateDocument } from "@/hooks/api";

interface DocumentCardProps {
  id: string;
  name: string;
  projectName: string;
  projectId?: string;
  workspaceId?: string;
  lastEditedAt: Date | string;
  thumbnail?: string;
  canMove?: boolean; // Whether user is OWNER and can move the document
  isFavorite?: boolean;
}

export function DocumentCard({ 
  id, 
  name, 
  projectName, 
  projectId,
  workspaceId,
  lastEditedAt, 
  thumbnail,
  canMove = false,
  isFavorite = false
}: DocumentCardProps) {
  const router = useRouter();
  const moveDocument = useMoveDocument();
  const toggleFavorite = useToggleFavorite();
  const updateDocument = useUpdateDocument();
  const deleteDocument = useDeleteDocument();
  const duplicateDocument = useDuplicateDocument();
  const { data: projectsData } = useWorkspaceProjects(workspaceId);
  const { data: personalProject } = usePersonalProject(workspaceId);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [newName, setNewName] = useState<string>(name);
  const [newSlug, setNewSlug] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const date = typeof lastEditedAt === 'string' ? new Date(lastEditedAt) : lastEditedAt;
  const timeAgo = formatDistanceToNow(date, { addSuffix: true }).replace(/^about /i, "~ ");

  const projects = (projectsData as { items?: any[] })?.items || [];
  const allProjects = personalProject 
    ? [{ id: (personalProject as any).id, name: "Drafts", isPersonal: true }, ...projects]
    : projects;

  const handleCardClick = () => {
    router.push(`/document/${id}`);
  };

  const handleMenuAction = async (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === "move") {
      setShowMoveDialog(true);
    } else if (action === "favorite") {
      await toggleFavorite.mutateAsync({
        entityType: "DOCUMENT",
        entityId: id,
        isFavorite,
        entityName: name,
      });
    } else if (action === "rename") {
      setNewName(name);
      setShowRenameDialog(true);
    } else if (action === "duplicate") {
      setNewName(`${name} Copy`);
      setNewSlug("");
      setShowDuplicateDialog(true);
    } else if (action === "delete") {
      setShowDeleteDialog(true);
    }
  };

  const handleMoveDocument = async () => {
    if (!selectedProjectId || selectedProjectId === projectId) {
      setShowMoveDialog(false);
      return;
    }
    try {
      const targetProject = allProjects.find((p: any) => p.id === selectedProjectId);
      await moveDocument.mutateAsync({ 
        documentId: id, 
        projectId: selectedProjectId,
        documentName: name,
        targetProjectName: targetProject?.name,
      });
      setShowMoveDialog(false);
      setSelectedProjectId("");
    } catch (err) {
      console.error("Failed to move document:", err);
    }
  };

  const handleRenameDocument = async () => {
    if (!newName.trim() || newName.trim() === name) {
      setShowRenameDialog(false);
      return;
    }
    try {
      const slug = newName.trim().toLowerCase().replace(/\s+/g, "-");
      await updateDocument.mutateAsync({ documentId: id, name: newName.trim(), slug, oldName: name });
      setShowRenameDialog(false);
    } catch (err) {
      console.error("Failed to rename document:", err);
    }
  };

  const handleDeleteDocument = async () => {
    try {
      await deleteDocument.mutateAsync({ documentId: id, documentName: name });
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  };

  const handleDuplicateDocument = async () => {
    if (!newName.trim()) return;
    try {
      const slug = newSlug.trim() || newName.trim().toLowerCase().replace(/\s+/g, "-");
      const duplicated = await duplicateDocument.mutateAsync({ documentId: id, name: newName.trim(), slug }) as { id?: string };
      setShowDuplicateDialog(false);
      setNewName("");
      setNewSlug("");
      // Navigate to the duplicated document
      if (duplicated?.id) {
        router.push(`/document/${duplicated.id}`);
      }
    } catch (err) {
      console.error("Failed to duplicate document:", err);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer transition-all hover:cursor-pointer"
    >
      {/* Preview */}
      <div className="mb-3 aspect-video w-full rounded-md bg-muted/30 flex items-center justify-center overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={name} 
            className="h-full w-full object-cover" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span className="text-xs">No preview</span>
          </div>
        )}
      </div>

      {/* Document name */}
      <div className="flex items-center justify-between">
      <h3 className="truncate text-sm font-medium text-foreground">
        {name}
      </h3>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 transition-opacity ${dropdownOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              onClick={(e) => e.stopPropagation()}
              aria-label="Document actions"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={(e) => handleMenuAction(e, "favorite")}>
              <Star className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </DropdownMenuItem>
            {canMove && (
              <DropdownMenuItem onClick={(e) => handleMenuAction(e, "move")}>
                <Move className="h-4 w-4 mr-2" />
                Move to Project
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={(e) => handleMenuAction(e, "rename")}>
              <Pencil className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => handleMenuAction(e, "duplicate")}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => handleMenuAction(e, "delete")}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
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
              <Label className="mb-2 block text-sm font-medium text-muted-foreground">
                Select Project
              </Label>
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

      {/* Rename Document Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium text-muted-foreground">
                Document Name
              </Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Document name"
                className="w-full"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newName.trim() && newName.trim() !== name) {
                    handleRenameDocument();
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRenameDialog(false);
                  setNewName(name);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRenameDocument}
                disabled={!newName.trim() || newName.trim() === name || updateDocument.isPending}
              >
                {updateDocument.isPending ? "Renaming..." : "Rename"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Duplicate Document Dialog */}
      <Dialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Duplicate Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium text-muted-foreground">
                Document Name
              </Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Document name"
                className="w-full"
                autoFocus
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium text-muted-foreground">
                Slug (optional)
              </Label>
              <Input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="document-slug"
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDuplicateDialog(false);
                  setNewName("");
                  setNewSlug("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDuplicateDocument}
                disabled={!newName.trim() || duplicateDocument.isPending}
              >
                {duplicateDocument.isPending ? "Duplicating..." : "Duplicate"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Document Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete "{name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteDocument}
                disabled={deleteDocument.isPending}
                variant="destructive"
              >
                {deleteDocument.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer with project link and time */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {projectId && workspaceId ? (
          <Link
            href={`/workspace/${workspaceId}/project/${projectId}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 py-1 text-muted-foreground transition-colors hover:text-accent-foreground"
            aria-label={`Go to ${projectName} project`}
          >
            <Folder className="h-3.5 w-3.5" />
            <span className="truncate text-xs flex-1 min-w-0">{projectName}</span>
          </Link>
        ) : (
          <div />
        )}
        <span className="shrink-0">{timeAgo}</span>
      </div>
    </div>
  );
}

