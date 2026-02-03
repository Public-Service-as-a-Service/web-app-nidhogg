import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Member } from "../interfaces/member";
import { ROUTES } from "../constants";

export const useMembers = (groupId: number) => {
  return useQuery<Member[]>({
    queryKey: ["groups", groupId, "members"],
    queryFn: async () => {
      const response = await axios.get<Member[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.groups}/${groupId}${ROUTES.members}`,
        { withCredentials: true },
      );
      return response.data;
    },
    enabled: !!groupId,
  });
};
