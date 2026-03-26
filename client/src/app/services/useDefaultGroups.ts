import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Employee } from "../interfaces/employee";

interface UseDefaultGroupsProps {
  queryKey: string;
  endpoint: string;
  enabled?: boolean;
}

export const useDefaultGroups = ({
  queryKey,
  endpoint,
  enabled = true,
}: UseDefaultGroupsProps) => {
  return useQuery<Employee[]>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get<Employee[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    enabled,
  });
};
