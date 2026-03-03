import { useEffect, useState } from "react";
import { SESSION_STORAGE } from "../constants";

export const useUserEmail = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(sessionStorage.getItem(SESSION_STORAGE.userEmail));
  }, []);

  return email;
};
