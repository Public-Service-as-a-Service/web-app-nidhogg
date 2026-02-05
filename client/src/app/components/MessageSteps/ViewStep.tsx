"use client";

import { Button, Label } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";

interface ViewStepProps {
  onPrev?: () => void;
  title?: string;
  messageBody?: string;
  recipients: string[];
  allChecked: boolean;
  channels: string[];
}

const ViewStep = ({
  onPrev,
  title = "",
  messageBody = "",
  recipients,
  allChecked,
  channels,
}: ViewStepProps) => {
  const t = useTranslations("ViewStep");

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center text-h4-md sm:text-xl md:text-2xl">
        {t("sectionTitle")}
      </h1>
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
            {allChecked ? (
              <Label>{t("sendToAll")}</Label>
            ) : (
              recipients.map((item) => <Label key={item}>{item}</Label>)
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-label-medium">{t("channelsLabel")}</p>
          <div className="flex flex-wrap gap-8 my-4">
            {channels.map((item) => (
              <Label key={item}>{item}</Label>
            ))}
          </div>
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
