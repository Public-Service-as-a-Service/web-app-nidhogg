"use client";

import { useTranslations } from "next-intl";
import { Button, Card, Combobox, Input } from "@sk-web-gui/react";
import { ArrowLeft, Check } from "lucide-react";
import MainWrapper from "@/app/components/MainWrapper";
import { USER_ROLES, type CreateUserRequest } from "@/app/services/useAdminUsers";

interface Props {
  form: CreateUserRequest;
  formError: string | null;
  isCreating: boolean;
  onChange: (form: CreateUserRequest) => void;
  onBack: () => void;
  onCreate: () => void;
}

const AdminCreateForm = ({ form, formError, isCreating, onChange, onBack, onCreate }: Props) => {
  const t = useTranslations("Admin");

  return (
    <MainWrapper>
      <Card>
        <Card.Body className="flex flex-col gap-20">
          <div className="flex items-center gap-12">
            <Button variant="secondary" size="sm" onClick={onBack}>
              <ArrowLeft size={16} /> {t("backButton")}
            </Button>
            <h1 className="text-h2-sm md:text-h2-lg">{t("createHeading")}</h1>
          </div>

          {formError && <p className="text-error">{formError}</p>}

          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("emailLabel")}</p>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={form.email}
              autoComplete="email"
              onChange={(e) => onChange({ ...form, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("phoneLabel")}</p>
            <Input
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={form.phoneNumber}
              autoComplete="tel"
              onChange={(e) => onChange({ ...form, phoneNumber: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("municipalityLabel")}</p>
            <Input
              type="text"
              placeholder={t("municipalityPlaceholder")}
              value={form.municipalityId}
              autoComplete="municipalityId"
              onChange={(e) => onChange({ ...form, municipalityId: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-label-large">{t("roleLabel")}</p>
            <Combobox value={form.role}>
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
            <p className="text-label-large">{t("passwordLabel")}</p>
            <Input
              type="password"
              placeholder={t("passwordLabel")}
              value={form.password}
              autoComplete="new-password"
              onChange={(e) => onChange({ ...form, password: e.target.value })}
            />
          </div>

          <div className="flex gap-8 justify-end pt-8">
            <Button variant="secondary" size="sm" onClick={onBack}>
              {t("cancelButton")}
            </Button>
            <Button
              size="sm"
              onClick={onCreate}
              disabled={isCreating || !form.email || !form.password || !form.phoneNumber || !form.municipalityId}
            >
              <Check size={16} /> {t("createButton")}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </MainWrapper>
  );
};

export default AdminCreateForm;
