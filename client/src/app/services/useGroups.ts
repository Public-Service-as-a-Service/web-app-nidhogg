import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { API_ENDPOINTS } from "../constants";

export const useGroups = () => {
  return useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await axios.get<Group[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groups}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
};
