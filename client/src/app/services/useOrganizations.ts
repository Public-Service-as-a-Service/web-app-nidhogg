import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Organization } from "../interfaces/organization";
import { API_ENDPOINTS } from "../constants";

export const useOrganizations = () => {
  return useQuery<Organization[]>({
    queryKey: ["organization"],
    queryFn: async () => {
      const response = await axios.get<Organization[]>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.allOrganizations}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
