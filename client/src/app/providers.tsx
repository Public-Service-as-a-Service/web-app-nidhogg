"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useMemo, useState, useEffect } from "react";
import {
  GuiProvider,
  defaultTheme,
  extendTheme,
  ConfirmationDialogContextProvider,
  Spinner,
} from "@sk-web-gui/react";
import { MessageGuardProvider } from "./components/LeavePageGuard";
import { LeavePageAlertPortal } from "./components/UnsavedChangesAlert";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [colorScheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const theme = useMemo(
    () =>
      extendTheme({
        cursor: colorScheme === "light" ? "pointer" : "default",
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [colorScheme]
  );
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return <Spinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GuiProvider theme={theme}>
        <ConfirmationDialogContextProvider>
          <MessageGuardProvider>
            <LeavePageAlertPortal />
            {children}
          </MessageGuardProvider>
        </ConfirmationDialogContextProvider>
      </GuiProvider>
    </QueryClientProvider>
  );
}