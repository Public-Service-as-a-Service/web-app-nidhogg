"use client";

import { Button, Label } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";

interface ViewStepProps {
  onPrev?: () => void;
  title?: string;
  messageBody?: string;
  recipients: string[];
}

const ViewStep = ({
  onPrev,
  title = "",
  messageBody = "",
  recipients,
}: ViewStepProps) => {
  const t = useTranslations("ViewStep");

  console.log(recipients); //TA BORT SEN

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">{t("sectionTitle")}</p>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col">
          <p className="text-label-medium">{t("titleLabel")}</p>
          <p>{title || "-"}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-label-medium">{t("messageLabel")}</p>
          <p>{messageBody || "-"}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-label-medium">{t("recipientsLabel")}</p>
          <div className="flex flex-wrap gap-8 my-4">
            {recipients.map((item) => (
              <Label key={item}>{item}</Label>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-label-medium">{t("channelsLabel")}</p>
          <p> {t("channelsInfo", { channel: "Teams" })} </p>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={onPrev}>
          {t("goBackButton")}
        </Button>
        <Button>{t("sendButton")}</Button>
      </div>
    </div>
  );
};

export default ViewStep;
