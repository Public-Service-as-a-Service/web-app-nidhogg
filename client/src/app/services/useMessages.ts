import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "../interfaces/message";
import { API_ENDPOINTS } from "../constants";

export const useMessages = () => {
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get<Message[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messages}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
};
