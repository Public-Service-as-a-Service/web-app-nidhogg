import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ROUTES } from "../constants";

export interface CreateGroupPayload {
  name: string;
  description: string;
  creatorId: string; //email
  employees: number[];
}

export const useCreateGroup = () => {
  return useMutation<unknown, AxiosError, CreateGroupPayload>({
    mutationFn: async (payload: CreateGroupPayload) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.groups}`,
        payload,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};