"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@sk-web-gui/react";
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

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M13.5 5.25H4.5V15C4.5 15.1989 4.57907 15.3896 4.71973 15.5303C4.86038 15.6709 5.05109 15.75 5.25 15.75H12.75C12.9489 15.75 13.1396 15.6709 13.2803 15.5303C13.4209 15.3896 13.5 15.1989 13.5 15V5.25ZM11.25 3C11.25 2.80109 11.1709 2.61038 11.0303 2.46973C10.8896 2.32907 10.6989 2.25 10.5 2.25H7.5C7.30109 2.25 7.11038 2.32907 6.96973 2.46973C6.82907 2.61038 6.75 2.80109 6.75 3V3.75H11.25V3ZM12.75 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H15V15C15 15.5967 14.7628 16.1689 14.3408 16.5908C13.9189 17.0128 13.3467 17.25 12.75 17.25H5.25C4.65326 17.25 4.08114 17.0128 3.65918 16.5908C3.23722 16.1689 3 15.5967 3 15V5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H5.25V3C5.25 2.40326 5.48722 1.83114 5.90918 1.40918C6.33114 0.987223 6.90326 0.75 7.5 0.75H10.5C11.0967 0.75 11.6689 0.987223 12.0908 1.40918C12.5128 1.83114 12.75 2.40326 12.75 3V3.75Z" fill="currentColor"/>
  </svg>
);

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
                    <TrashIcon />
                    <span style={labelMediumStyle}>{t("deleteButton")}</span>
                  </Button>
                </div>
              ) : (
                <div className="flex gap-8 ml-auto">
                  <Button {...tertiaryButtonProps} onClick={() => onChange({ ...form, status: isActive ? "INACTIVE" : "ACTIVE" })}>
                    <span style={labelMediumStyle}>{isActive ? t("deactivateButton") : t("activateButton")}</span>
                  </Button>
                  <Button {...tertiaryButtonProps} onClick={() => setShowDeleteConfirm(true)}>
                    <TrashIcon />
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
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M5 10V15H11.6667V10H5ZM0 2.5C0 1.83696 0.263581 1.20126 0.732422 0.732422C1.20126 0.263581 1.83696 0 2.5 0H11.0116C11.668 0.00935033 12.2937 0.27752 12.7547 0.744629L12.7555 0.743815L15.9229 3.91113H15.922C16.3894 4.37217 16.6573 4.99846 16.6667 5.65511V14.1667C16.6667 14.8297 16.4031 15.4654 15.9342 15.9342C15.4654 16.4031 14.8297 16.6667 14.1667 16.6667H2.5C1.83696 16.6667 1.20126 16.4031 0.732422 15.9342C0.263581 15.4654 0 14.8297 0 14.1667V2.5ZM1.66667 14.1667C1.66667 14.3877 1.75453 14.5996 1.91081 14.7559C2.06709 14.9121 2.27899 15 2.5 15H3.33333V10C3.33333 9.55797 3.50905 9.13417 3.82161 8.82161C4.13417 8.50905 4.55797 8.33333 5 8.33333H11.6667C12.1087 8.33333 12.5325 8.50905 12.8451 8.82161C13.1576 9.13418 13.3333 9.55797 13.3333 10V15H14.1667C14.3877 15 14.5996 14.9121 14.7559 14.7559C14.9121 14.5996 15 14.3877 15 14.1667V5.67871L14.9951 5.59652C14.9737 5.4071 14.8875 5.22981 14.7502 5.09521L14.7437 5.08952V5.0887L11.5715 1.9165C11.4369 1.77918 11.2596 1.69301 11.0701 1.67155L10.988 1.66667H5V4.16667H10.8333C11.2936 4.16667 11.6667 4.53976 11.6667 5C11.6667 5.46024 11.2936 5.83333 10.8333 5.83333H5C4.55797 5.83333 4.13417 5.65761 3.82161 5.34505C3.50905 5.03249 3.33333 4.60869 3.33333 4.16667V1.66667H2.5C2.27899 1.66667 2.06709 1.75453 1.91081 1.91081C1.75453 2.06709 1.66667 2.27899 1.66667 2.5V14.1667Z" fill="currentColor"/>
            </svg>
          </Button>
        </div>
      </div>
    </MainWrapper>
  );
};

export default AdminEditForm;
