import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MessageRecipient } from "../interfaces/message";
import { API_ENDPOINTS } from "../constants";

interface MessageRecipientsResponse {
  content: MessageRecipient[];
}

export const useMessageRecipients = (id: number) => {
  return useQuery<MessageRecipient[]>({
    queryKey: ["messages", id],
    queryFn: async () => {
      const response = await axios.get<
        MessageRecipient[] | MessageRecipientsResponse
      >(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messageRecipients(id)}`,
        {
          params: {
            messageId: id,
            page: 0,
            size: 10,
            sort: "desc",
          },
          withCredentials: true,
        },
      );

      return Array.isArray(response.data)
        ? response.data
        : response.data.content;
    },
  });
};
