"use client";

import { useRouter } from "next/navigation";
import { useWorkspaces, usePersonalProject, useCreateDocument, useFavoritesWithDetails } from "@/hooks/api";
import { Clock, Folder, FileText, Plus } from "lucide-react";
import { LogoFull } from "@/components/logo";
import { Button } from "@/app/ui/components/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/components/select";
import { Avatar, AvatarFallback } from "@/app/ui/components/avatar";
import { useState, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/components/dialog";
import { Input } from "@/app/ui/components/input";
import { Skeleton } from "@/app/ui/skeleton";

interface SidebarProps {
  workspaceId: string;
  activeSection?: "recent" | "projects" | "drafts";
  onSectionChange?: (section: "recent" | "projects" | "drafts") => void;
}

function SidebarComponent({ workspaceId, activeSection = "recent", onSectionChange }: SidebarProps) {
  const router = useRouter();
  const { data: workspaces, isLoading: isLoadingWorkspaces } = useWorkspaces();
  const { data: personalProject } = usePersonalProject(workspaceId);
  const { data: favoritesData, isLoading: isLoadingFavorites } = useFavoritesWithDetails();
  const createDocument = useCreateDocument();
  const [selectOpen, setSelectOpen] = useState(false);
  const [showCreateDocument, setShowCreateDocument] = useState(false);
  const [documentName, setDocumentName] = useState("");
  
  const favorites = favoritesData || { projects: [], documents: [] };
  const hasFavorites = favorites.projects.length > 0 || favorites.documents.length > 0;

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
    if (onSectionChange) {
      onSectionChange("drafts");
    } else {
      router.push(`/workspace/${workspaceId}?section=drafts`);
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

  const currentWorkspace = workspaces?.items?.find((ws: any) => ws.id === workspaceId);

  return (
    <aside className="w-80 p-4 flex flex-col space-y-4">
      <nav className="flex-1 bg-background border border-border rounded-xl p-4 space-y-2 flex flex-col">
        <div className="mb-2">
          <LogoFull className="h-6 mb-2 w-auto text-foreground" />
        </div>
        <AnimatePresence mode="wait">
          {isLoadingWorkspaces ? (
            <motion.div
              key="workspace-select-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <Skeleton className="h-10 w-full rounded-md" />
            </motion.div>
          ) : (
            <motion.div
              key="workspace-select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col gap-1">
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
        </div>
        
        <AnimatePresence mode="wait">
          {!isLoadingFavorites && hasFavorites && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-t border-border my-4" />
              <p className="text-sm font-medium text-foreground">Favorites</p>
              <div className="space-y-1">
                {favorites.projects.map((project: { id: string; workspaceId: string; name: string }) => (
                  <button
                    key={`project-${project.id}`}
                    onClick={() => router.push(`/workspace/${project.workspaceId}/project/${project.id}`)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                  >
                    <Folder className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate flex-1">{project.name}</span>
                  </button>
                ))}
                {favorites.documents.map((doc: { id: string; name: string }) => (
                  <button
                    key={`document-${doc.id}`}
                    onClick={() => router.push(`/document/${doc.id}`)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate flex-1">{doc.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-auto pt-2">
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
      </nav>
    </aside>
  );
}

export const Sidebar = memo(SidebarComponent);

