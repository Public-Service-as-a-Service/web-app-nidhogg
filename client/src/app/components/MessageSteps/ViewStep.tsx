"use client";

import { Button, Label } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";

interface Props {
  onPrev?: () => void;
  title?: string;
  messageBody?: string;
}

const ViewStep = ({ onPrev, title = "", messageBody = "" }: Props) => {
  const t = useTranslations("ViewStep");

  const recipients = [
    {
      title: "Alla chefer",
    },
    {
      title: "Krisgruppen",
    },
    {
      title: "IT-jouren",
    },
  ];

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
            {recipients.map((item) => (
              <Label key={item.title}>{item.title}</Label>
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
