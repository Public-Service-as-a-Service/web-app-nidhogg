//"use server";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Credentials } from "../page";
import { SESSION_STORAGE } from "../constants";

export const useLogin = () => {
  return useMutation<unknown, AxiosError, Credentials>({
    mutationFn: async (credentials: Credentials) => {
      const response = await axios.post("/api/login", credentials, {
        withCredentials: true,
      });
      if (response) {
        sessionStorage.setItem(SESSION_STORAGE.sessionActive, "true");
      }
      return response;
    },
  });
};
