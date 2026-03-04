import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { API_ENDPOINTS } from "../constants";

export const useGroups = (creatorId: string) => {
  return useQuery<Group[]>({
    queryKey: ["groups", creatorId],
    queryFn: async () => {
      const response = await axios.get<Group[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groups}`,
        {
          params: { creatorId: creatorId },
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
