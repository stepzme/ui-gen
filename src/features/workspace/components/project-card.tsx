"use client";

import { useRouter } from "next/navigation";

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
      className="group cursor-pointer rounded-lg border border-border-secondary bg-background-primary p-4 transition-all hover:border-border-primary hover:bg-background-secondary"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-background-secondary border border-border-primary">
        <svg className="h-6 w-6 text-foreground-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="mb-1 truncate text-sm font-medium text-foreground-primary group-hover:text-foreground-primary">
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs text-foreground-secondary">
        <span>{documentCount} {documentCount === 1 ? 'document' : 'documents'}</span>
        <span className="truncate ml-2">{owner}</span>
      </div>
    </div>
  );
}

