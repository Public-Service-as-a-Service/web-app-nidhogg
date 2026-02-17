import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Employee } from "../interfaces/employee";
import { ROUTES } from "../constants";

interface SearchParams {
  query: string;
  page?: number;
  size?: number;
  sort?: string[];
}

interface SearchResponse {
  content: Employee[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

export const useSearchEmployees = () => {
  return useMutation<SearchResponse, Error, SearchParams>({
    mutationFn: async (params) => {
      const response = await axios.post<SearchResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.searchEmployees}`,
        {
          page: params.page || 0,
          size: params.size || 10,
          sort: params.sort || [],
        },
        {
          withCredentials: true,
          params: { search: params.query },
        },
      );
      return response.data;
    },
  });
};
