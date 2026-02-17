import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "../interfaces/message";
import { ROUTES } from "../constants";

export const useMessage = (id: string) => {
  return useQuery<Message>({
    queryKey: ["messages", id],
    queryFn: async () => {
      const response = await axios.get<Message>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.messages}/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
