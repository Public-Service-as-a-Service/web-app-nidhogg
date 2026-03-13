import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Group } from "../interfaces/group";
import { API_ENDPOINTS } from "../constants";

export interface UpdateGroupPayload {
  name: string;
  description: string;
  employees: number[];
}

interface UpdateGroupParams {
  groupId: number;
  payload: UpdateGroupPayload;
}

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<Group, AxiosError, UpdateGroupParams>({
    mutationFn: async ({ groupId, payload }) => {
      const response = await axios.put<Group>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groupById(groupId)}`,
        payload,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
