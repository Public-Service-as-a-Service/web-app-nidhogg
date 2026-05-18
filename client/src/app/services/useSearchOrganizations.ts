import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Organization } from "../interfaces/organization";
import { API_ENDPOINTS } from "../constants";

interface SearchParams {
  query: string;
  page?: number;
  size?: number;
  sort?: string;
}

interface SearchResponse {
  content: Organization[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

export const useSearchOrganizations = () => {
  return useMutation<SearchResponse, Error, SearchParams>({
    mutationFn: async (params) => {
      const response = await axios.get<SearchResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.searchOrganizations}`,
        {
          withCredentials: true,
          params: {
            search: params.query,
            page: params.page || 0,
            size: params.size || 5,
            sort: params.sort,
          },
        },
      );
      return response.data;
    },
  });
};
