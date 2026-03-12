import { useEffect, useState } from "react";
import { SESSION_STORAGE } from "../constants";

//PLACEHOLDER tills webAppUsers integreras!!!
export const useUserEmail = (): string => {
  const [email, setEmail] = useState<string>(() => {
    return sessionStorage.getItem(SESSION_STORAGE.userEmail) || "";
  });

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE.userEmail);
    if (stored) setEmail(stored);
  }, []);

  return email;
};
