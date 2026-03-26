"use client";

import { useTranslations } from "next-intl";
import { Button, Card } from "@sk-web-gui/react";
import { Pencil, Trash2, Plus } from "lucide-react";
import MainWrapper from "@/app/components/MainWrapper";
import { type AdminUser } from "@/app/services/useAdminUsers";

interface Props {
  users: AdminUser[] | undefined;
  isLoading: boolean;
  isError: boolean;
  deleteConfirm: number | null;
  isDeleting: boolean;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
  onDeleteConfirm: (id: number) => void;
  onDeleteCancel: () => void;
  onCreateClick: () => void;
}

const AdminUserList = ({
  users,
  isLoading,
  isError,
  deleteConfirm,
  isDeleting,
  onEdit,
  onDelete,
  onDeleteConfirm,
  onDeleteCancel,
  onCreateClick,
}: Props) => {
  const t = useTranslations("Admin");

  return (
    <MainWrapper>
      <div className="flex flex-col gap-24">
        <div className="flex items-center justify-between">
          <h1 className="text-h2-sm md:text-h2-lg">{t("title")}</h1>
          <Button size="sm" onClick={onCreateClick}>
            <Plus size={16} /> {t("newUserButton")}
          </Button>
        </div>

        {isLoading && <p>{t("loading")}</p>}
        {isError && <p className="text-error">{t("errors.loadFailed")}</p>}
        {!isLoading && !isError && users?.length === 0 && <p>{t("noUsers")}</p>}

        {users?.map((user) => (
          <Card key={user.id}>
            <Card.Body className="flex flex-col gap-10 w-full pt-16">
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-400">ID: {user.id}</span>
                <div className="flex gap-8">
                  <Button size="sm" variant="secondary" onClick={() => onEdit(user)}>
                    <Pencil size={14} /> {t("editButton")}
                  </Button>
                  {deleteConfirm === user.id ? (
                    <>
                      <Button size="sm" onClick={() => onDelete(user)} disabled={isDeleting}>
                        <Trash2 size={14} /> {t("deleteConfirm")}
                      </Button>
                      <Button size="sm" variant="secondary" onClick={onDeleteCancel}>
                        {t("cancelButton")}
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => onDeleteConfirm(user.id)}>
                      <Trash2 size={14} /> {t("deleteButton")}
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  { label: t("emailLabel"), value: user.email },
                  { label: t("phoneLabel"), value: user.phoneNumber },
                  { label: t("municipalityLabel"), value: user.municipalityId },
                  { label: t("statusLabel"), value: user.status },
                  { label: t("roleLabel"), value: user.role },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-8">
                    <span className="text-base font-medium w-[160px] shrink-0 whitespace-nowrap">{label}:</span>
                    <span className="text-base">{value || "—"}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </MainWrapper>
  );
};

export default AdminUserList;
