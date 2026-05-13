import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SESSION_STORAGE } from "../constants";
import { API_ENDPOINTS } from "../constants";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.logout}`,
        {},
        { withCredentials: true },
      );
      if (response) {
        sessionStorage.removeItem(SESSION_STORAGE.sessionActive);
        queryClient.removeQueries({ queryKey: ["currentUser"] });
      }
      return response;
    },
  });
};
