import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { API_ENDPOINTS } from "../constants";
import dayjs from "dayjs";
import { getAuthenticatedEmail } from "@/utils/auth";

export const useGroups = () => {
  return useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const authenticated = await getAuthenticatedEmail();

      if (!authenticated.ok) {
        throw new Error("Unauthorized");
      }

      const response = await axios.get<Group[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groups}`,
        {
          params: { creatorId: authenticated.email },
          withCredentials: true,
        },
      );
      return response.data;
    },
    select: (groups) =>
      [...groups].sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt))),
  });
};
