"use client";

import { Button, Chip } from "@sk-web-gui/react";
import MessageForm from "./MessageForm";
import CheckboxCard from "./CheckboxCard";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface MessageStepProps {
  onPrev?: () => void;
  onNext?: () => void;
  title?: string;
  messageBody?: string;
  setTitle?: (value: string) => void;
  setMessageBody?: (value: string) => void;
  recipients: string[];
  allChecked: boolean;
}

const MessageStep = ({
  onPrev,
  onNext,
  title,
  messageBody,
  setTitle,
  setMessageBody,
  recipients,
  allChecked,
}: MessageStepProps) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  const t = useTranslations("MessageStep");

  useEffect(() => {
    if (title !== "" && messageBody !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, messageBody]);

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl"> {t("sectionTitle")} </p>
      <div className="flex flex-col gap-8 pb-28">
        <div>
          <p className="text-label-medium mb-8 mt-0">{t("recipients")}</p>
          <div className="flex flex-wrap gap-8">
            {allChecked ? (
              <Chip>{t("sendToAll")}</Chip>
            ) : (
              recipients.map((item) => <Chip key={item}>{item}</Chip>)
            )}
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
            allChecked={allChecked}
          />
          <CheckboxCard
            label={t("checkboxes.smsLabel")}
            description={t("checkboxes.smsDesc")}
            allChecked={allChecked}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={onPrev} className="self-start">
          {t("goBackButton")}
        </Button>
        <Button
          disabled={disabled}
          onClick={onNext}
          className="self-start"
        >
          {t("reviewButton")}
        </Button>
      </div>
    </div>
  );
};

export default MessageStep;
