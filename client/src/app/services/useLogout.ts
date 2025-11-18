import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SESSION_STORAGE } from "../constants";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "/api/logout",
        {},
        { withCredentials: true }
      );
      if (response) {
        sessionStorage.removeItem(SESSION_STORAGE.sessionActive);
      }
      return response;
    },
  });
};
