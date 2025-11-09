"use client";

import { useRouter } from "next/navigation";
import { useWorkspaces } from "@/hooks/api";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator, useSelectContext } from "@/components/ui/select/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";

function CreateWorkspaceButtonInSelect({ onClick }: { onClick: () => void }) {
  const { setOpen } = useSelectContext();
  
  return (
      <Button
        variant="text"
        semantic="default"
        className="w-full"
        onClick={() => {
          onClick();
          setOpen(false);
        }}
      >
        Create workspace
      </Button>
  );
}

interface SidebarProps {
  workspaceId: string;
  activeSection?: "recent" | "projects";
  onSectionChange?: (section: "recent" | "projects") => void;
}

export function Sidebar({ workspaceId, activeSection = "recent", onSectionChange }: SidebarProps) {
  const router = useRouter();
  const { data: workspaces } = useWorkspaces();

  const handleCreateWorkspace = () => {
    router.push("/workspace/new");
  };

  const handleValueChange = (value: string) => {
    if (value === "__create__") {
      handleCreateWorkspace();
    } else {
      router.push(`/workspace/${value}`);
    }
  };

  const currentWorkspace = workspaces?.items?.find((ws: any) => ws.id === workspaceId);

  return (
    <aside className="w-80 p-x4 bg-background0-primary flex flex-col space-y-x4">
      <div className="p-x4 bg-background0-secondary rounded-x5">
        <Select value={workspaceId} onValueChange={handleValueChange}>
          <SelectTrigger>
            {currentWorkspace && (
              <div className="flex items-center gap-x3 flex-1 min-w-0 text-left">
                <Avatar className="size-6 shrink-0">
                  <AvatarFallback>
                    {currentWorkspace.name?.charAt(0)?.toUpperCase() || "W"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground-primary truncate">
                  {currentWorkspace.name}
                </span>
              </div>
            )}
          </SelectTrigger>
          <SelectContent>
            {workspaces?.items?.map((ws: any) => (
              <SelectItem key={ws.id} value={ws.id} textValue={ws.name}>
                <div className="flex items-center gap-x3 w-full">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback>
                      {ws.name?.charAt(0)?.toUpperCase() || "W"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground-primary truncate">
                      {ws.name}
                    </div>
                    <div className="text-xs text-foreground-secondary">
                      {ws.projectCount || 0} {ws.projectCount === 1 ? 'project' : 'projects'}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
            <SelectSeparator />
            <CreateWorkspaceButtonInSelect onClick={handleCreateWorkspace} />
          </SelectContent>
        </Select>
      </div>
      
      <nav className="flex-1 bg-background0-secondary rounded-x5 p-x4 space-y-x2">
        <Button
          onClick={() => {
            if (onSectionChange) {
              onSectionChange("recent");
            } else {
              router.push(`/workspace/${workspaceId}`);
            }
          }}
          variant="text"
          semantic="default"
          className={`w-full justify-start ${
            activeSection === "recent"
              ? "bg-button-transparent-primary-bodyHover text-button-text-primary-textHover"
              : "text-button-text-primary-textNormal hover:bg-button-transparent-primary-bodyHover hover:text-button-text-primary-textHover"
          }`}
        >
          <Icon variant="clocks" className="h-4 w-4" />
          Recent
        </Button>
        <Button
          onClick={() => {
            if (onSectionChange) {
              onSectionChange("projects");
            }
          }}
          variant="text"
          semantic="default"
          className={`w-full justify-start ${
            activeSection === "projects"
              ? "bg-button-transparent-primary-bodyHover text-button-text-primary-textHover"
              : "text-button-text-primary-textNormal hover:bg-button-transparent-primary-bodyHover hover:text-button-text-primary-textHover"
          }`}
        >
          <Icon variant="folders" className="h-4 w-4" />
          Projects
        </Button>
      </nav>
    </aside>
  );
}
