"use client";

import { useRouter } from "next/navigation";
import { useWorkspaces } from "@/hooks/api";
import { Clock, Folder } from "lucide-react";
import { Button } from "@/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import { Avatar, AvatarFallback } from "@/ui/components/avatar";
import { useState } from "react";

interface SidebarProps {
  workspaceId: string;
  activeSection?: "recent" | "projects";
  onSectionChange?: (section: "recent" | "projects") => void;
}

export function Sidebar({ workspaceId, activeSection = "recent", onSectionChange }: SidebarProps) {
  const router = useRouter();
  const { data: workspaces } = useWorkspaces();
  const [selectOpen, setSelectOpen] = useState(false);

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

  const currentWorkspace = workspaces?.items?.find((ws: any) => ws.id === workspaceId);

  return (
    <aside className="w-80 p-4 bg-zinc-50 flex flex-col space-y-4 dark:bg-zinc-950">
      <div className="p-4 bg-white rounded-xl dark:bg-zinc-900">
        <Select value={workspaceId} onValueChange={handleValueChange} open={selectOpen} onOpenChange={setSelectOpen}>
          <SelectTrigger className="w-full">
            {currentWorkspace ? (
              <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarFallback className="text-xs">
                    {currentWorkspace.name?.charAt(0)?.toUpperCase() || "W"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-zinc-900 truncate dark:text-zinc-50">
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
                    <div className="text-sm font-medium text-[var(--ui-foreground)] truncate">
                      {ws.name}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
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
      </div>
      
      <nav className="flex-1 bg-white rounded-xl p-4 space-y-2 dark:bg-zinc-900">
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
      </nav>
    </aside>
  );
}

