"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCreateWorkspace } from "@/hooks/api";

export default function NewWorkspacePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const createWorkspace = useCreateWorkspace();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Workspace name is required");
      return;
    }
    try {
      const ws = await createWorkspace.mutateAsync({ name: name.trim() });
      router.push(`/workspace/${ws.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create workspace");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-primary px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border-secondary bg-background-primary p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground-primary">Create Workspace</h1>
          <p className="mt-2 text-sm text-foreground-secondary">
            Get started by creating your first workspace
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="workspace-name" className="mb-1 block text-sm font-medium text-foreground-secondary">
              Workspace Name
            </label>
            <input
              id="workspace-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Workspace"
              className="w-full rounded-md border border-border-primary bg-background-secondary px-3 py-2 text-sm text-foreground-primary placeholder-foreground-secondary outline-none transition-colors focus:border-border-primary focus:ring-2 focus:ring-ring-secondary"
              aria-label="Workspace Name"
              required
              autoFocus
            />
          </div>
          {error && (
            <div className="rounded-md bg-background-critical/50 border border-border-critical px-3 py-2 text-sm text-foreground-critical" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={createWorkspace.isPending}
            className="w-full rounded-md bg-foreground-inverted px-4 py-2 text-sm font-medium text-background-inverted transition-colors hover:bg-background-secondary hover:text-foreground-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createWorkspace.isPending ? "Creating..." : "Create Workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}

