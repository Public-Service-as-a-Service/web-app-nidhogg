import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "../interfaces/message";

export const useMessages = () => {
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get<Message[]>("/api/messages", {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
