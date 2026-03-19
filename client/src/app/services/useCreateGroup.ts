import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../constants";
import { getAuthenticatedEmail } from "@/utils/auth";

export interface CreateGroupPayload {
  name: string;
  description: string;
  employees: number[];
}

export const useCreateGroup = () => {
  return useMutation<unknown, AxiosError, CreateGroupPayload>({
    mutationFn: async (payload: CreateGroupPayload) => {
      const authenticated = await getAuthenticatedEmail();

      if (!authenticated.ok) {
        throw new Error("Unauthorized");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groups}`,
        {
          ...payload,
          creatorId: authenticated.email,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
