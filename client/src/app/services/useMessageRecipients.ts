import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MessageRecipient } from "../interfaces/message";
import { API_ENDPOINTS } from "../constants";

interface MessageRecipientsResponse {
  content: MessageRecipient[];
  totalPages: number;
  number?: number;
  currentPage?: number;
}

interface MessageRecipientsResult {
  content: MessageRecipient[];
  totalPages: number;
  currentPage: number;
}

export const useMessageRecipients = (id: number, page = 0, size = 10) => {
  return useQuery<MessageRecipientsResult>({
    queryKey: ["messages", id, "recipients", page, size],
    queryFn: async () => {
      const response = await axios.get<MessageRecipientsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messageRecipients(id)}`,
        {
          params: {
            messageId: id,
            page,
            size,
            sort: "desc",
          },
          withCredentials: true,
        },
      );

      return {
        content: response.data.content,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage ?? response.data.number ?? page,
      };
    },
  });
};
