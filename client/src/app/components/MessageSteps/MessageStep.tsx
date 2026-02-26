"use client";

import { Button, Chip } from "@sk-web-gui/react";
import MessageForm from "./MessageForm";
import CheckboxCard from "./CheckboxCard";
import RecipientList from "./RecipientList";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";

interface MessageStepProps {
  onPrev?: () => void;
  onNext?: () => void;
  title?: string;
  messageBody?: string;
  setTitle?: (value: string) => void;
  setMessageBody?: (value: string) => void;
  recipientGroups: Record<string, GroupRecipient>;
  recipientsById: Record<string, Employee>;
  allChecked: boolean;
  channels: string[];
  handleChannels: (name: string) => void;
}

const MessageStep = ({
  onPrev,
  onNext,
  title,
  messageBody,
  setTitle,
  setMessageBody,
  recipientGroups,
  recipientsById,
  allChecked,
  channels,
  handleChannels,
}: MessageStepProps) => {
  const t = useTranslations("MessageStep");

  const isDisabled = !title || !messageBody || channels.length === 0;

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center text-h2-sm">{t("sectionTitle")}</h1>

      <div className="flex flex-col gap-8 pb-28">
        <div>
          <p className="text-label-medium mb-8 mt-0">{t("recipients")}</p>
          <RecipientList
            recipientGroups={recipientGroups}
            recipientsById={recipientsById}
            allChecked={allChecked}
            component={Chip}
          />
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
            handleItems={handleChannels}
            items={channels}
          />
          <CheckboxCard
            label={t("checkboxes.smsLabel")}
            description={t("checkboxes.smsDesc")}
            handleItems={handleChannels}
            items={channels}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={onPrev} className="self-start">
          {t("goBackButton")}
        </Button>

        <Button disabled={isDisabled} onClick={onNext} className="self-start">
          {t("reviewButton")}
        </Button>
      </div>
    </div>
  );
};

export default MessageStep;
