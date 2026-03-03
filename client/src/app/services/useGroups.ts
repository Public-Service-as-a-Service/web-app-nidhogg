import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { ROUTES } from "../constants";

export const useGroups = (id: number) => {
  return useQuery<Group[]>({
    queryKey: ["groups", id],
    queryFn: async () => {
      const response = await axios.get<Group[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.groups}`,
        {
          params: { creatorId: id },
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
