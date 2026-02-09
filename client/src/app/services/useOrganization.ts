import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Organization } from "../interfaces/organization";
// import { ROUTES } from "../constants";

export const useOrganization = (id: number) => {
  return useQuery<Organization>({
    queryKey: ["organization", id],
    queryFn: async () => {
      const response = await axios.get<Organization>(
        // `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.groups}`,
        `/api/notifier/organization/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
};
