import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ROUTES } from "../constants";

export interface SendMessagePayload {
  title: string;
  content: string;
  sender: string;
  recipientEmployeeIds: number[];
  messageType: string;
}

export const useSendMessage = () => {
  return useMutation<unknown, AxiosError, SendMessagePayload>({
    mutationFn: async (payload: SendMessagePayload) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.messages}`,
        payload,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
