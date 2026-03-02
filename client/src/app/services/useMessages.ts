import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "../interfaces/message";
import { ROUTES } from "../constants";

export const useMessages = (email: string) => {
  return useQuery<Message[]>({
    queryKey: ["messages", email],
    queryFn: async () => {
      const response = await axios.get<Message[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.messages}`,
        {
          params: { sender: email },
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
