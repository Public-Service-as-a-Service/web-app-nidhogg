import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Group } from "../interfaces/group";
import { ROUTES } from "../constants";

export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: async (groupId: number) => {
      const response = await axios.delete<Group>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.groups}/${groupId}`,
        { withCredentials: true },
      );
      return response.data;
    },
  });
};
