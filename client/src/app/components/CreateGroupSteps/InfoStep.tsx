"use client";

import { Button, Input, Textarea } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface InfoStepProps {
  title?: string;
  description?: string;
  setTitle?: (value: string) => void;
  setDescription?: (value: string) => void;
  onNext: () => void;
}

const InfoStep = ({
  title = "",
  description = "",
  setTitle,
  setDescription,
  onNext,
}: InfoStepProps) => {
  const router = useRouter();
  const t = useTranslations("GroupHandling");

  return (
    <div className="flex flex-col gap-40">
      <h1 className="text-h3-md !m-0">{t("infoStepTitle")}</h1>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">{t("groupNameLabel")}</p>
        <Input
          placeholder={t("groupNamePlaceholder")}
          value={title}
          onChange={(e) => setTitle && setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">{t("groupDescription")}</p>
        <Textarea
          placeholder={t("groupDescriptionPlaceholder")}
          className="w-full min-h-[150px]"
          value={description}
          onChange={(e) => setDescription && setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-row place-content-between">
        <Button
          variant="secondary"
          onClick={() => router.push("/dashboard/groups")}
        >
          <ArrowLeft />
          {t("goBackButton")}
        </Button>
        <Button onClick={onNext}>
          {t("nextButton")}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default InfoStep;
