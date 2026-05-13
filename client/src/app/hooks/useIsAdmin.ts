import { useCurrentUser } from "../services/useCurrentUser";

const useIsAdmin = (enabled = true) => {
  const { data: currentUser } = useCurrentUser({ enabled });

  const isAdmin = currentUser?.role === "ADMIN";

  return isAdmin;
};

export default useIsAdmin;
