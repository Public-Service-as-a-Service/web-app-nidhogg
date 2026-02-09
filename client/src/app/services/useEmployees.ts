import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Employee } from "../interfaces/employee";
import { ROUTES } from "../constants";

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axios.get<Employee[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.allEmployees}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
