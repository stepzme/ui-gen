"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  }));
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

