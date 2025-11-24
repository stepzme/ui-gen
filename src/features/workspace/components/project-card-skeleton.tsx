import { Skeleton } from "@/app/ui/skeleton";

export function ProjectCardSkeleton() {
  return (
    <div className="group flex flex-col justify-end cursor-pointer h-64 rounded-lg border border-border bg-card p-4 transition-all relative">
      {/* Menu button skeleton */}
      <div className="absolute top-3 right-3">
        <Skeleton className="h-6 w-6 rounded" />
      </div>

      {/* Project name skeleton */}
      <Skeleton className="h-4 w-2/3 mb-4" />

      {/* Document count skeleton */}
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

