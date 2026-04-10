"use client";
import { createContext, useContext, useState } from "react";

interface MessageGuardContextProps {
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  pendingAction: (() => void) | null;
  setPendingAction: (fn: (() => void) | null) => void;
}

const MessageGuardContext = createContext<MessageGuardContextProps | null>(null);

export const MessageGuardProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  return (
    <MessageGuardContext.Provider value={{ hasChanges, setHasChanges, showAlert, setShowAlert, pendingAction, setPendingAction }}>
      {children}
    </MessageGuardContext.Provider>
  );
};

export const useLeavePageGuard = () => {
  const ctx = useContext(MessageGuardContext);
  if (!ctx) throw new Error("useMessageGuard must be used within MessageGuardProvider");
  return ctx;
};