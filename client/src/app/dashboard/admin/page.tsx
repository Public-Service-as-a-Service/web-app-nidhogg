"use client";

import { useState } from "react";
import {
  useAdminUsers,
  useCreateUser,
  useUpdateUser,
  useUpdateUserPassword,
  useDeleteUser,
  type AdminUser,
  type CreateUserRequest,
} from "@/app/services/useAdminUsers";
import AdminUserList from "@/app/components/AdminView/AdminUserList";
import AdminCreateForm from "@/app/components/AdminView/AdminCreateForm";
import AdminEditForm, { type EditForm } from "@/app/components/AdminView/AdminEditForm";
import { useTranslations } from "next-intl";

const EMPTY_CREATE_FORM: CreateUserRequest = {
  email: "",
  password: "",
  phoneNumber: "",
  municipalityId: "",
  status: "ACTIVE",
  role: "USER",
};

type Mode = "list" | "create" | { type: "edit"; user: AdminUser };

const AdminPage = () => {
  const t = useTranslations("Admin");
  const { data: users, isLoading, isError } = useAdminUsers();

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdateUserPassword();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const [mode, setMode] = useState<Mode>("list");
  const [newUser, setNewUser] = useState<CreateUserRequest>(EMPTY_CREATE_FORM);
  const [editForm, setEditForm] = useState<EditForm>({
    email: "",
    phoneNumber: "",
    municipalityId: "",
    status: "ACTIVE",
    role: "USER",
    newPassword: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openEdit = (user: AdminUser) => {
    setEditForm({
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      municipalityId: user.municipalityId ?? "",
      status: user.status ?? "ACTIVE",
      role: user.role ?? "USER",
      newPassword: "",
    });
    setFormError(null);
    setMode({ type: "edit", user });
  };

  const normalizePhone = (phone: string) => {
    const digits = phone.replace(/\s+/g, "");
    return digits.startsWith("+46") ? "0" + digits.slice(3) : digits;
  };

  const handleCreate = () => {
    setFormError(null);
    createUser({ ...newUser, phoneNumber: normalizePhone(newUser.phoneNumber) }, {
      onSuccess: () => {
        setNewUser(EMPTY_CREATE_FORM);
        setMode("list");
      },
      onError: () => setFormError(t("errors.createFailed")),
    });
  };

  const handleUpdate = (user: AdminUser) => {
    setFormError(null);
    const { newPassword, ...fields } = editForm;
    if (fields.phoneNumber) fields.phoneNumber = normalizePhone(fields.phoneNumber);

    updateUser(
      { email: user.email, data: fields },
      {
        onSuccess: () => {
          if (newPassword) {
            updatePassword(
              { email: fields.email ?? user.email, password: newPassword },
              {
                onSuccess: () => setMode("list"),
                onError: () => setFormError(t("errors.updateFailed")),
              },
            );
          } else {
            setMode("list");
          }
        },
        onError: () => setFormError(t("errors.updateFailed")),
      },
    );
  };

  const handleDelete = (user: AdminUser) => {
    deleteUser(user.email, {
      onSuccess: () => setDeleteConfirm(null),
    });
  };

  if (mode === "create") {
    return (
      <AdminCreateForm
        form={newUser}
        formError={formError}
        isCreating={isCreating}
        onChange={setNewUser}
        onBack={() => { setMode("list"); setFormError(null); setNewUser(EMPTY_CREATE_FORM); }}
        onCreate={handleCreate}
      />
    );
  }

  if (typeof mode === "object" && mode.type === "edit") {
    return (
      <AdminEditForm
        user={mode.user}
        form={editForm}
        formError={formError}
        isUpdating={isUpdating}
        isUpdatingPassword={isUpdatingPassword}
        onChange={setEditForm}
        onBack={() => { setMode("list"); setFormError(null); }}
        onSave={() => handleUpdate(mode.user)}
      />
    );
  }

  return (
    <AdminUserList
      users={users}
      isLoading={isLoading}
      isError={isError}
      deleteConfirm={deleteConfirm}
      isDeleting={isDeleting}
      onEdit={openEdit}
      onDelete={handleDelete}
      onDeleteConfirm={setDeleteConfirm}
      onDeleteCancel={() => setDeleteConfirm(null)}
      onCreateClick={() => { setFormError(null); setMode("create"); }}
    />
  );
};

export default AdminPage;
