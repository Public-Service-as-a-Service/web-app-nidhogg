import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MessageRecipient } from "../interfaces/message";
import { API_ENDPOINTS } from "../constants";

interface MessageRecipientsResponse {
  content: MessageRecipient[];
  totalPages?: number;
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
      const response = await axios.get<
        MessageRecipient[] | MessageRecipientsResponse
      >(
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

      if (Array.isArray(response.data)) {
        return {
          content: response.data,
          totalPages: response.data.length > 0 ? 1 : 0,
          currentPage: 0,
        };
      }

      return {
        content: response.data.content,
        totalPages: response.data.totalPages ?? 0,
        currentPage: response.data.currentPage ?? response.data.number ?? page,
      };
    },
  });
};
