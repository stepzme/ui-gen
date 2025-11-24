"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { AccretionShaders } from "@/app/ui/components/accretion-shaders";
import { Logo } from "@/components/logo";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Фоновый шейдер */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-background-primary" />}>
          <AccretionShaders
            speed={0.4}
            turbulence={10}
            depth={1.0}
            brightness={0.8}
            colorShift={0.2}
            hue={0.66}
            saturation={1.0}
            quality={10.0}
            sharpness={5}
            className="h-full w-full"
          />
        </Suspense>
      </div>

      {/* Overlay для лучшей читаемости */}
      <div className="absolute inset-0 z-[1] bg-background-primary/60 backdrop-blur-[2px]" />

      {/* Форма логина */}
      <div className="relative z-10 w-full max-w-sm space-y-6 p-8">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <Logo className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground-primary">Welcome to Pulsar</h1>
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
            className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}


