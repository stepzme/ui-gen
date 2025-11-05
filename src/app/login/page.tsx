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
    <div className="mx-auto max-w-sm p-6 text-neutral-50">
      <h1 className="mb-4 text-lg font-semibold">Log in</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Password"
        />
        {error && <div className="text-sm text-red-400" role="alert">{error}</div>}
        <button type="submit" className="w-full rounded border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-sky-500">Sign in</button>
      </form>
    </div>
  );
}


