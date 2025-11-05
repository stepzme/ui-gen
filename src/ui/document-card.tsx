"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface DocumentCardProps {
  id: string;
  name: string;
  projectName: string;
  lastEditedAt: Date | string;
  thumbnail?: string;
}

export function DocumentCard({ id, name, projectName, lastEditedAt, thumbnail }: DocumentCardProps) {
  const router = useRouter();
  const date = typeof lastEditedAt === 'string' ? new Date(lastEditedAt) : lastEditedAt;
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <div
      onClick={() => router.push(`/document/${id}`)}
      className="group cursor-pointer rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800"
    >
      <div className="mb-3 aspect-video w-full rounded-md bg-neutral-800 flex items-center justify-center border border-neutral-700">
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="h-full w-full object-cover rounded-md" />
        ) : (
          <div className="text-neutral-500 text-sm">No preview</div>
        )}
      </div>
      <h3 className="mb-1 truncate text-sm font-medium text-neutral-50 group-hover:text-neutral-100">
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span className="truncate">{projectName}</span>
        <span>{timeAgo}</span>
      </div>
    </div>
  );
}

