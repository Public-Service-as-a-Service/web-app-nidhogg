import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../constants";

export type AdminUser = {
  id: number;
  email: string;
  phoneNumber?: string;
  municipalityId?: string;
  status?: string;
  role?: string;
};

export type CreateUserRequest = {
  email: string;
  password: string;
  phoneNumber: string;
  municipalityId: string;
  status: string;
  role: string;
};

export type UpdateUserRequest = {
  email?: string;
  phoneNumber?: string;
  municipalityId?: string;
  status?: string;
  role?: string;
};

export const USER_STATUSES = ["ACTIVE", "INACTIVE", "SUSPENDED"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const USER_ROLES = ["USER", "ADMIN"] as const;
export type UserRole = (typeof USER_ROLES)[number];

const base = () =>
  `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.adminUsers}`;

export const useAdminUsers = () =>
  useQuery<AdminUser[]>({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axios.get<AdminUser[]>(base(), {
        withCredentials: true,
      });
      return res.data;
    },
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<AdminUser, AxiosError, CreateUserRequest>({
    mutationFn: async (data) => {
      const res = await axios.post<AdminUser>(base(), data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] }),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<AdminUser, AxiosError, { email: string; data: UpdateUserRequest }>({
    mutationFn: async ({ email, data }) => {
      const res = await axios.patch<AdminUser>(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.adminUserByEmail(email)}`,
        data,
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] }),
  });
};

export const useUpdateUserPassword = () =>
  useMutation<void, AxiosError, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.adminUserPassword(email)}`,
        password,
        {
          withCredentials: true,
          headers: { "Content-Type": "text/plain" },
        },
      );
    },
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: async (email) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.adminUserByEmail(email)}`,
        { withCredentials: true },
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] }),
  });
};
