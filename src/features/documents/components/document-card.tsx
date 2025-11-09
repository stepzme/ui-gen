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
      className="group cursor-pointer"
    >
      <div className="mb-3 aspect-video w-full rounded-md bg-background-secondary flex items-center justify-center border border-border-primary">
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="h-full w-full object-cover rounded-md" />
        ) : (
          <div className="text-foreground-secondary text-sm">No preview</div>
        )}
      </div>
      <h3 className="mb-1 truncate text-sm font-medium text-foreground-primary group-hover:text-foreground-primary">
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs text-foreground-secondary">
        <span className="truncate">{projectName}</span>
        <span>{timeAgo}</span>
      </div>
    </div>
  );
}

