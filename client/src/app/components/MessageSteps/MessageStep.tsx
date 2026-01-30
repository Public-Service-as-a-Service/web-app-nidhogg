"use client";

import { Button, Chip } from "@sk-web-gui/react";
import MessageForm from "./MessageForm";
import CheckboxCard from "./CheckboxCard";
import { useTranslations } from "next-intl";

interface MessageStepProps {
  onPrev?: () => void;
  onNext?: () => void;
  title?: string;
  messageBody?: string;
  setTitle?: (value: string) => void;
  setMessageBody?: (value: string) => void;
}

const MessageStep = ({
  onPrev,
  onNext,
  title,
  messageBody,
  setTitle,
  setMessageBody,
}: MessageStepProps) => {
  const t = useTranslations("MessageStep");

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
      <div className="flex flex-col gap-8 pb-28">
        <div>
          <p className="text-label-medium mb-8 mt-0">{t("recipients")}</p>
          <div className="flex flex-wrap gap-8">
            {recipients.map((item) => (
              <Chip key={item.title}>{item.title}</Chip>
            ))}
          </div>
          <MessageForm
            title={title}
            messageBody={messageBody}
            setTitle={setTitle}
            setMessageBody={setMessageBody}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label={t("checkboxes.teamsLabel")}
            description={t("checkboxes.teamsDesc")}
          />
          <CheckboxCard
            label={t("checkboxes.smsLabel")}
            description={t("checkboxes.smsDesc")}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={onPrev} className="self-start">
          {t("goBackButton")}
        </Button>
        <Button variant="primary" onClick={onNext} className="self-start">
          {t("reviewButton")}
        </Button>
      </div>
    </div>
  );
};

export default MessageStep;
