import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Credentials } from "../page";
import { API_ENDPOINTS, SESSION_STORAGE } from "../constants";

export const useLogin = () => {
  return useMutation<unknown, AxiosError, Credentials>({
    mutationFn: async (credentials: Credentials) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.login}`,
        credentials,
        {
          withCredentials: true,
        },
      );
      if (response) {
        const me = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          { withCredentials: true },
        );
        sessionStorage.setItem(SESSION_STORAGE.sessionActive, "true");
        sessionStorage.setItem(SESSION_STORAGE.userRole, me.data.role ?? "USER");
      }
      return response;
    },
  });
};
