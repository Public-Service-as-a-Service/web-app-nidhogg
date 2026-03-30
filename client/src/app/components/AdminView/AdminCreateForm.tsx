"use client";

import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@sk-web-gui/react";
import MainWrapper from "@/app/components/MainWrapper";
import { type CreateUserRequest } from "@/app/services/useAdminUsers";

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

  const canCreate = !!form.email && !!form.password && !!form.phoneNumber && !!form.municipalityName;

  return (
    <MainWrapper>
      <div className="flex flex-col gap-16">
        <h1 className="text-h1-sm md:text-h1-lg">{t("createHeading")}</h1>

        <Card>
          <Card.Body className="flex-1 flex flex-col gap-20">
            <p className="text-label-large opacity-60">{t("requiredFields")}</p>

            {formError && <p className="text-error">{formError}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-8">
                  <p className="text-label-large">{t("emailLabel")}</p>
                  <Input
                    size="lg"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={form.email}
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
                    value={form.municipalityName}
                    onChange={(e) => onChange({ ...form, municipalityName: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <p className="text-label-large">{t("passwordLabel")}</p>
                  <Input
                    size="lg"
                    type="password"
                    value={form.password}
                    autoComplete="new-password"
                    onChange={(e) => onChange({ ...form, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-label-large">{t("phoneLabel")}</p>
                <Input
                  size="lg"
                  style={{ width: "100%" }}
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  value={form.phoneNumber}
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
          <Button size="sm" onClick={onCreate} disabled={isCreating || !canCreate}>
            <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: "32px", fontVariantNumeric: "lining-nums proportional-nums" }}>
              {t("createButton")}
            </span>
          </Button>
        </div>
      </div>
    </MainWrapper>
  );
};

export default AdminCreateForm;
