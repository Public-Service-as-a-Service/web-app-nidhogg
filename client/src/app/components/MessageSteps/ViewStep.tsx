"use client";

import { Button, Label } from "@sk-web-gui/react";
import RecipientList from "./RecipientList";
import { useTranslations } from "next-intl";
import { useSendMessage } from "@/app/services/useSendMessage";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/services/useCurrentUser";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";
import Loading from "../LoadingSpinner";
import { PAGE_ROUTES } from "@/app/constants";
import { useGroupMemberIds } from "@/app/hooks/useGroupMemberIds";

interface ViewStepProps {
  onPrev?: () => void;
  title?: string;
  messageBody?: string;
  recipientGroups: Record<string, GroupRecipient>;
  recipientEmployees: Record<string, Employee>;
  allChecked: boolean;
  channels: string[];
}

const ViewStep = ({
  onPrev,
  title = "",
  messageBody = "",
  recipientGroups,
  recipientEmployees,
  allChecked,
  channels,
}: ViewStepProps) => {
  const t = useTranslations("ViewStep");
  const router = useRouter();
  const mutation = useSendMessage(allChecked);
  const { data: currentUser } = useCurrentUser();
  const email = currentUser?.email ?? "";

  const defaultGroupRecipientIds = useGroupMemberIds(recipientGroups);

  const employeeRecipients = Object.values(recipientEmployees);
  const employeeRecipientIds = employeeRecipients.map((emp) => emp.id);

  const groupRecipients = Object.values(recipientGroups);
  const groupRecipientIds = groupRecipients.flatMap((group) => {
    if (group.employees?.length) {
      return group.employees.map((employee) => employee.id);
    }

    return group.recipientIds ?? [];
  });

  const recipientEmployeeIds = Array.from(
    new Set([
      ...employeeRecipientIds,
      ...groupRecipientIds,
      ...defaultGroupRecipientIds,
    ]),
  );

  const handleSend = () => {
    const getMessageType = (channels: string[]) => {
      const hasSMS = channels.includes("SMS");
      const hasTeams = channels.includes("Microsoft Teams");

      if (hasSMS && hasTeams) return "TEAMS_AND_SMS";
      if (hasTeams) return "TEAMS";
      if (hasSMS) return "SMS";

      return "NONE";
    };

    const payload = {
      title,
      content: messageBody,
      sender: email,
      messageType: getMessageType(channels),

      ...(!allChecked && { recipientEmployeeIds: recipientEmployeeIds }),
    };

    mutation.mutate(payload, {
      onSuccess: () => router.push(PAGE_ROUTES.dashboard),
    });
  };

  if (mutation.isPending) {
    return <Loading />;
  }

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
          <RecipientList
            recipientGroups={recipientGroups}
            recipientEmployees={recipientEmployees}
            allChecked={allChecked}
            component={Label}
          />
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
        <Button onClick={handleSend}>{t("sendButton")}</Button>
      </div>
    </div>
  );
};

export default ViewStep;
