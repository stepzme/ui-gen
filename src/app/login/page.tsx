"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const search = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) {
      const target = search.get("redirect") || "/";
      router.replace(target);
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-primary">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-border-secondary bg-background-primary p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground-primary">Log in</h1>
          <p className="mt-2 text-sm text-foreground-secondary">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground-secondary">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-border-primary bg-background-secondary px-3 py-2 text-sm text-foreground-primary placeholder-foreground-secondary outline-none transition-colors focus:border-border-primary focus:ring-2 focus:ring-ring-secondary"
              aria-label="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground-secondary">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-border-primary bg-background-secondary px-3 py-2 text-sm text-foreground-primary placeholder-foreground-secondary outline-none transition-colors focus:border-border-primary focus:ring-2 focus:ring-ring-secondary"
              aria-label="Password"
              required
            />
          </div>
          {error && (
            <div className="rounded-md bg-background-critical/50 border border-border-critical px-3 py-2 text-sm text-foreground-critical" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-foreground-inverted px-4 py-2 text-sm font-medium text-background-inverted transition-colors hover:bg-background-secondary hover:text-foreground-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-secondary"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}


