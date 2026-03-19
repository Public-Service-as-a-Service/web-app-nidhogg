import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../constants";
import { getAuthenticatedEmail } from "@/utils/auth";

export interface SendMessagePayload {
  title: string;
  content: string;
  recipientEmployeeIds: number[];
  messageType: string;
}

export const useSendMessage = () => {
  return useMutation<unknown, AxiosError, SendMessagePayload>({
    mutationFn: async (payload: SendMessagePayload) => {
      const authenticated = await getAuthenticatedEmail();

      if ("response" in authenticated) {
        throw new Error("Unauthorized");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messages}`,
        {
          ...payload,
          sender: authenticated.email,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
