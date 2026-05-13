import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Credentials } from "../page";
import { API_ENDPOINTS, SESSION_STORAGE } from "../constants";

type CurrentUser = {
  email: string;
  role: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<CurrentUser, AxiosError, Credentials>({
    mutationFn: async (credentials: Credentials) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.login}`,
        credentials,
        {
          withCredentials: true,
        },
      );

      const me = await axios.get<CurrentUser>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        { withCredentials: true },
      );

      sessionStorage.setItem(SESSION_STORAGE.sessionActive, "true");
      queryClient.setQueryData(["currentUser"], me.data);

      return me.data;
    },
  });
};
