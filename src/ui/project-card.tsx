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
      className="group cursor-pointer rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-neutral-800 border border-neutral-700">
        <svg className="h-6 w-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="mb-1 truncate text-sm font-medium text-neutral-50 group-hover:text-neutral-100">
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span>{documentCount} {documentCount === 1 ? 'document' : 'documents'}</span>
        <span className="truncate ml-2">{owner}</span>
      </div>
    </div>
  );
}

