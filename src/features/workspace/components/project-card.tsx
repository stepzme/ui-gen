"use client";

import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  documentCount: number;
  owner: string;
}

export function ProjectCard({ id, name, documentCount, owner, workspaceId }: ProjectCardProps & { workspaceId: string }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/workspace/${workspaceId}/project/${id}`)}
      className="group cursor-pointer rounded-lg border border-border bg-card p-4 transition-all hover:bg-accent"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-secondary border border-border">
        <Folder className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mb-1 truncate text-sm font-medium text-foreground">
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{documentCount} {documentCount === 1 ? 'document' : 'documents'}</span>
        <span className="truncate ml-2">{owner}</span>
      </div>
    </div>
  );
}

