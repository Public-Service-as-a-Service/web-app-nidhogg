import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";

export const useGroups = () => {
  return useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await axios.get<Group[]>("/api/groups", {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
