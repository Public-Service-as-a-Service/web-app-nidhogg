import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "../interfaces/message";
import { API_ENDPOINTS } from "../constants";
import { getAuthenticatedEmail } from "@/utils/auth";

export const useMessage = (id: number) => {
  return useQuery<Message>({
    queryKey: ["messages", id],
    queryFn: async () => {
      const authenticated = await getAuthenticatedEmail();

      if ("response" in authenticated) {
        throw new Error("Unauthorized");
      }

      const email = authenticated.email;

      const response = await axios.get<Message>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messageById(id, email)}`,
        {
          params: {
            sender: email,
            messageId: id,
          },
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
