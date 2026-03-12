import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../constants";

export interface CreateGroupPayload {
  name: string;
  description: string;
  creatorId: string;
  employees: number[];
}

export const useCreateGroup = () => {
  return useMutation<unknown, AxiosError, CreateGroupPayload>({
    mutationFn: async (payload: CreateGroupPayload) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groups}`,
        payload,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
