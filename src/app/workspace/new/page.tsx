"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCreateWorkspace } from "@/hooks/api";
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";

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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground">Create Workspace</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started by creating your first workspace
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace-name">
              Workspace Name
            </Label>
            <Input
              id="workspace-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Workspace"
              aria-label="Workspace Name"
              required
              autoFocus
            />
          </div>
          {error && (
            <div className="rounded-md bg-red-600/50 border border-red-600 px-3 py-2 text-sm text-red-200" role="alert">
              {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={createWorkspace.isPending}
            className="w-full"
          >
            {createWorkspace.isPending ? "Creating..." : "Create Workspace"}
          </Button>
        </form>
      </div>
    </div>
  );
}

