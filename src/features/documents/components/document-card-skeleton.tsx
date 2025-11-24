import { Skeleton } from "@/app/ui/skeleton";

export function DocumentCardSkeleton() {
  return (
    <div className="group cursor-pointer transition-all">
      {/* Preview skeleton */}
      <div className="mb-3 aspect-video w-full rounded-md bg-muted/30 overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Document name skeleton */}
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-6 rounded" />
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

