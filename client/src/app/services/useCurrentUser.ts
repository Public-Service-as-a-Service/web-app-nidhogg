import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CurrentUser {
  email: string;
  role: string;
}

export const useCurrentUser = () => {
  return useQuery<CurrentUser>({
    queryKey: ["currentUser"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          withCredentials: true,
        })
        .then((r) => r.data),
    staleTime: Infinity,
  });
};
