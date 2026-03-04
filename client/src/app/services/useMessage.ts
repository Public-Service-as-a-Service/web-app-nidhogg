import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "../interfaces/message";
import { API_ENDPOINTS } from "../constants";

export const useMessage = (id: string) => {
  return useQuery<Message>({
    queryKey: ["messages", id],
    queryFn: async () => {
      const response = await axios.get<Message>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messageById(id)}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
