import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Employee } from "../interfaces/employee";
import { API_ENDPOINTS } from "../constants";

export const useManagers = (enabled: boolean = true) => {
  return useQuery<Employee[]>({
    queryKey: ["managers"],
    queryFn: async () => {
      const response = await axios.get<Employee[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.allManagers}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    enabled,
  });
};
