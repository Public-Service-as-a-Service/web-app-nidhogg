import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { API_ENDPOINTS } from "../constants";

export const useGroup = (id: number) => {
  return useQuery<Group>({
    queryKey: ["groups", id],
    queryFn: async () => {
      const response = await axios.get<Group>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groupById(id)}`,
        { withCredentials: true },
      );
      return response.data;
    },
    enabled: !!id,
  });
};
