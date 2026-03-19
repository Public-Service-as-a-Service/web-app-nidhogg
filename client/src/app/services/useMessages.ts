import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "../interfaces/message";
import { API_ENDPOINTS } from "../constants";
import dayjs from "dayjs";
import { getAuthenticatedEmail } from "@/utils/auth";

export const useMessages = () => {
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const authenticated = await getAuthenticatedEmail();

      if (!authenticated.ok) {
        throw new Error("Unauthorized");
      }

      const response = await axios.get<Message[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messages}`,
        {
          params: { sender: authenticated.email },
          withCredentials: true,
        },
      );
      return response.data;
    },
    select: (messages) =>
      [...messages].sort((a, b) =>
        dayjs(b.createdAt).diff(dayjs(a.createdAt)),
      ),
  });
};
