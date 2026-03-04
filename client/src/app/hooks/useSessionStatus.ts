import { useEffect, useState } from "react";
import { useLogout } from "../services/useLogout";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES, SESSION_STORAGE } from "../constants";

const useSessionStatus = () => {
  const { mutate } = useLogout();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_STORAGE.sessionActive)) {
      setLoggedIn(true);
    } else {
      mutate(undefined, {
        onSuccess: () => {
          router.push(PAGE_ROUTES.home);
        },
      });
    }
  }, [mutate, router]);

  return loggedIn;
};

export default useSessionStatus;
