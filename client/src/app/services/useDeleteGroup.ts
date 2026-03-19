import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { API_ENDPOINTS } from "../constants";

export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: async (groupId: number) => {
      const response = await axios.delete<Group>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.groups}/${groupId}`,
        { withCredentials: true },
      );
      return response.data;
    },
  });
};
