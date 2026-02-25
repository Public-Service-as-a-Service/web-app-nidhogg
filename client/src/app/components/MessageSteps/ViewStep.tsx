"use client";

import { Button, Label } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";

interface ViewStepProps {
  onPrev?: () => void;
  title?: string;
  messageBody?: string;
  recipientGroups: Record<string, GroupRecipient>;
  recipientsById: Record<string, Employee>;
  allChecked: boolean;
  channels: string[];
}

const ViewStep = ({
  onPrev,
  title = "",
  messageBody = "",
  recipientGroups,
  recipientsById,
  allChecked,
  channels,
}: ViewStepProps) => {
  const t = useTranslations("ViewStep");

  const employeeRecipients = Object.values(recipientsById);
  const groupRecipients = Object.values(recipientGroups);

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center text-h2-sm">{t("sectionTitle")}</h1>
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
              <>
                {groupRecipients.map((group) => (
                  <Label key={group.id}>{group.name}</Label>
                ))}
                {employeeRecipients.map((employee) => (
                  <Label key={employee.personId}>
                    {employee.firstName} {employee.lastName}
                  </Label>
                ))}
              </>
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
