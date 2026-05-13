import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CurrentUser {
  email: string;
  role: string;
}

interface UseCurrentUserOptions {
  enabled?: boolean;
}

export const useCurrentUser = ({ enabled = true }: UseCurrentUserOptions = {}) => {
  return useQuery<CurrentUser>({
    queryKey: ["currentUser"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          withCredentials: true,
        })
        .then((r) => r.data),
    enabled,
    retry: false,
    staleTime: Infinity,
  });
};
