"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { StaticDataProvider } from "../lib/staticData";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StaticDataProvider>{children}</StaticDataProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
