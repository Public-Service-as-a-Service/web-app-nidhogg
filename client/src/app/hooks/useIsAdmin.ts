import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SESSION_STORAGE } from "../constants";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const role = sessionStorage.getItem(SESSION_STORAGE.userRole);
    setIsAdmin(role === "ADMIN");
  }, [pathname]);

  return isAdmin;
};

export default useIsAdmin;
