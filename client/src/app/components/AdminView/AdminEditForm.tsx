"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@sk-web-gui/react";
import { Trash, Save } from "lucide-react";
import MainWrapper from "@/app/components/MainWrapper";
import { type AdminUser, type UpdateUserRequest } from "@/app/services/useAdminUsers";

export type EditForm = UpdateUserRequest & { newPassword: string };

interface Props {
  user: AdminUser;
  form: EditForm;
  formError: string | null;
  isUpdating: boolean;
  isUpdatingPassword: boolean;
  isDeleting: boolean;
  onChange: (form: EditForm) => void;
  onBack: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const labelLargeStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: "32px",
  fontVariantNumeric: "lining-nums proportional-nums",
};

const largeTextStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "26px",
  fontVariantNumeric: "lining-nums proportional-nums",
};

const labelMediumStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  fontVariantNumeric: "lining-nums proportional-nums",
};

const tertiaryButtonProps = {
  variant: "secondary" as const,
  size: "sm" as const,
  className: "dark:ring-[0.5px] dark:ring-white/5",
  style: { borderRadius: "12px", background: "rgba(28, 28, 40, 0.12)", border: "none" },
};


const AdminEditForm = ({
  user,
  form,
  formError,
  isUpdating,
  isUpdatingPassword,
  isDeleting,
  onChange,
  onBack,
  onSave,
  onDelete,
}: Props) => {
  const t = useTranslations("Admin");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isBusy = isUpdating || isUpdatingPassword;
  const canSave = !!form.email && !!form.phoneNumber && !!form.municipalityName;
  const isActive = form.status === "ACTIVE";

  return (
    <MainWrapper>
      <div className="flex flex-col gap-16">
        <h1 className="text-h1-sm md:text-h1-lg">{t("editHeading")}</h1>

        <Card>
          <Card.Body className="flex-1 flex flex-col gap-20">
            {/* Top row: ID left, action buttons far right */}
            <div className="flex items-start w-full">
              <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums" }}>
                ID: {user.id}
              </p>
              {showDeleteConfirm ? (
                <div className="flex items-center gap-8 ml-auto">
                  <p className="text-base font-medium">{t("deleteConfirm")}</p>
                  <Button variant="secondary" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                    <span style={labelMediumStyle}>{t("deleteCancelButton")}</span>
                  </Button>
                  <Button size="sm" onClick={onDelete} disabled={isDeleting}>
                    <Trash size={18} />
                    <span style={labelMediumStyle}>{t("deleteButton")}</span>
                  </Button>
                </div>
              ) : (
                <div className="flex gap-8 ml-auto">
                  <Button {...tertiaryButtonProps} onClick={() => onChange({ ...form, status: isActive ? "INACTIVE" : "ACTIVE" })}>
                    <span style={labelMediumStyle}>{isActive ? t("deactivateButton") : t("activateButton")}</span>
                  </Button>
                  <Button {...tertiaryButtonProps} onClick={() => setShowDeleteConfirm(true)}>
                    <Trash size={18} />
                    <span style={labelMediumStyle}>{t("deleteButton")}</span>
                  </Button>
                </div>
              )}
            </div>

            <p style={largeTextStyle}>{t("editSectionHeading")}</p>

            {formError && <p className="text-error">{formError}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-8">
                  <p style={labelLargeStyle}>{t("emailLabel")}</p>
                  <Input
                    size="lg"
                    type="email"
                    value={form.email ?? ""}
                    autoComplete="email"
                    onChange={(e) => onChange({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <p className="text-label-large">{t("municipalityLabel")}</p>
                  <Input
                    size="lg"
                    type="text"
                    placeholder={t("municipalityPlaceholder")}
                    value={form.municipalityName ?? ""}
                    onChange={(e) => onChange({ ...form, municipalityName: e.target.value })}
                  />
                </div>
                <hr className="opacity-20" />
                <p style={largeTextStyle}>{t("editPasswordHeading")}</p>
                <div className="flex flex-col gap-8">
                  <p style={labelLargeStyle}>{t("newPasswordLabel")}</p>
                  <Input
                    size="lg"
                    type="password"
                    placeholder={t("newPasswordPlaceholder")}
                    value={form.newPassword}
                    autoComplete="new-password"
                    onChange={(e) => onChange({ ...form, newPassword: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <p style={labelLargeStyle}>{t("phoneLabel")}</p>
                <Input
                  size="lg"
                  style={{ width: "100%" }}
                  type="tel"
                  value={form.phoneNumber ?? ""}
                  autoComplete="tel"
                  onChange={(e) => onChange({ ...form, phoneNumber: e.target.value })}
                />
              </div>
            </div>

          </Card.Body>
        </Card>

        <div className="flex gap-8 justify-end">
          <Button variant="secondary" size="sm" onClick={onBack}>
            <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: "32px", fontVariantNumeric: "lining-nums proportional-nums" }}>
              {t("cancelButton")}
            </span>
          </Button>
          <Button size="sm" onClick={onSave} disabled={isBusy || !canSave}>
            <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: "32px", fontVariantNumeric: "lining-nums proportional-nums" }}>
              {t("saveButton")}
            </span>
            <Save size={17} />
          </Button>
        </div>
      </div>
    </MainWrapper>
  );
};

export default AdminEditForm;
