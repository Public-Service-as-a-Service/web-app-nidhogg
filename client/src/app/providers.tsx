"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useMemo, useState } from "react";
import {
  GuiProvider,
  defaultTheme,
  extendTheme,
  ConfirmationDialogContextProvider,
} from "@sk-web-gui/react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [colorScheme] = useState("light");

  const theme = useMemo(
    () =>
      extendTheme({
        cursor: colorScheme === "light" ? "pointer" : "default",
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [colorScheme]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GuiProvider theme={theme}>
        <ConfirmationDialogContextProvider>
          {children}
        </ConfirmationDialogContextProvider>
      </GuiProvider>
    </QueryClientProvider>
  );
}
