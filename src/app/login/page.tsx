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
      const target = search.get("redirect") || "/dashboard";
      router.replace(target);
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-50">Log in</h1>
          <p className="mt-2 text-sm text-neutral-400">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-50 placeholder-neutral-500 outline-none transition-colors focus:border-neutral-600 focus:ring-2 focus:ring-neutral-700"
              aria-label="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-neutral-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-50 placeholder-neutral-500 outline-none transition-colors focus:border-neutral-600 focus:ring-2 focus:ring-neutral-700"
              aria-label="Password"
              required
            />
          </div>
          {error && (
            <div className="rounded-md bg-red-950/50 border border-red-900/50 px-3 py-2 text-sm text-red-400" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}


