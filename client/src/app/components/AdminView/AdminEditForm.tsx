"use client";

import { useTranslations } from "next-intl";
import { Button, Card, Combobox, Input } from "@sk-web-gui/react";
import { ArrowLeft, Check } from "lucide-react";
import MainWrapper from "@/app/components/MainWrapper";
import { USER_ROLES, USER_STATUSES, type AdminUser, type UpdateUserRequest } from "@/app/services/useAdminUsers";

export type EditForm = UpdateUserRequest & { newPassword: string };

interface Props {
  user: AdminUser;
  form: EditForm;
  formError: string | null;
  isUpdating: boolean;
  isUpdatingPassword: boolean;
  onChange: (form: EditForm) => void;
  onBack: () => void;
  onSave: () => void;
}

const AdminEditForm = ({ user, form, formError, isUpdating, isUpdatingPassword, onChange, onBack, onSave }: Props) => {
  const t = useTranslations("Admin");

  return (
    <MainWrapper>
      <Card>
        <Card.Body className="flex flex-col gap-20">
          <div className="flex items-center gap-12">
            <Button variant="secondary" size="sm" onClick={onBack}>
              <ArrowLeft size={16} /> {t("backButton")}
            </Button>
            <h1 className="text-h2-sm md:text-h2-lg">{t("editHeading")}</h1>
          </div>

          <p className="text-base text-gray-400">ID: {user.id}</p>

          {formError && <p className="text-error">{formError}</p>}

          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("emailLabel")}</p>
            <Input
              type="email"
              value={form.email ?? ""}
              autoComplete="email"
              onChange={(e) => onChange({ ...form, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("phoneLabel")}</p>
            <Input
              type="tel"
              value={form.phoneNumber ?? ""}
              autoComplete="tel"
              onChange={(e) => onChange({ ...form, phoneNumber: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("municipalityLabel")}</p>
            <Input
              type="text"
              value={form.municipalityId ?? ""}
              autoComplete="municipalityId"
              onChange={(e) => onChange({ ...form, municipalityId: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("statusLabel")}</p>
            <Combobox value={form.status ?? "ACTIVE"}>
              <Combobox.Input className="w-full" />
              <Combobox.List>
                {USER_STATUSES.map((s) => (
                  <Combobox.Option key={s} value={s} onChange={() => onChange({ ...form, status: s })}>
                    {s}
                  </Combobox.Option>
                ))}
              </Combobox.List>
            </Combobox>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("roleLabel")}</p>
            <Combobox value={form.role ?? "USER"}>
              <Combobox.Input className="w-full" />
              <Combobox.List>
                {USER_ROLES.map((r) => (
                  <Combobox.Option key={r} value={r} onChange={() => onChange({ ...form, role: r })}>
                    {r}
                  </Combobox.Option>
                ))}
              </Combobox.List>
            </Combobox>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("newPasswordLabel")}</p>
            <p className="text-base text-gray-400">{t("newPasswordHint")}</p>
            <Input
              type="password"
              placeholder={t("newPasswordPlaceholder")}
              value={form.newPassword}
              autoComplete="new-password"
              onChange={(e) => onChange({ ...form, newPassword: e.target.value })}
            />
          </div>

          <div className="flex gap-8 justify-end pt-8">
            <Button variant="secondary" size="sm" onClick={onBack}>
              {t("cancelButton")}
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              disabled={isUpdating || isUpdatingPassword || !form.email || !form.phoneNumber || !form.municipalityId}
            >
              <Check size={16} /> {t("saveButton")}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </MainWrapper>
  );
};

export default AdminEditForm;
