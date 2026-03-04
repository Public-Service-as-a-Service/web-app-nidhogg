import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { ROUTES } from "../constants";

export const useGroups = (creatorId: string) => {
  return useQuery<Group[]>({
    queryKey: ["groups", creatorId],
    queryFn: async () => {
      const response = await axios.get<Group[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.groups}`,
        {
          params: { creatorId: creatorId },
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
