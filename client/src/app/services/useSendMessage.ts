import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../constants";

export interface SendMessagePayload {
  title: string;
  content: string;
  sender: string;
  recipientEmployeeIds?: number[];
  messageType: string;
}

export const useSendMessage = (allChecked: boolean) => {
  return useMutation<unknown, AxiosError, SendMessagePayload>({
    mutationFn: async (payload: SendMessagePayload) => {
      const response = await axios.post(
        allChecked
          ? `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messagesAll}`
          : `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messages}`,
        payload,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
