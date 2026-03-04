import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { ROUTES } from "../constants";

export const useGroup = (groupId: number) => {
  return useQuery<Group>({
    queryKey: ["groups", groupId],
    queryFn: async () => {
      const response = await axios.get<Group>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.groups}/${groupId}`,
        { withCredentials: true },
      );
      return response.data;
    },
    enabled: !!groupId,
  });
};
