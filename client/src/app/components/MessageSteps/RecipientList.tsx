"use client";

import { useState } from "react";
import { Button } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";

interface RecipientListProps {
  recipientGroups: Record<string, GroupRecipient>;
  recipientEmployees: Record<string, Employee>;
  allChecked: boolean;
  component: React.ComponentType<{ children: React.ReactNode }>;
}

const RecipientList = ({
  recipientGroups,
  recipientEmployees,
  allChecked,
  component: Component,
}: RecipientListProps) => {
  const [showAll, setShowAll] = useState(false);

  const t = useTranslations("MessageStepsCommon");

  const employeeRecipients = Object.values(recipientEmployees);
  const groupRecipients = Object.values(recipientGroups);

  const allRecipients = [
    ...groupRecipients.map((group) => ({
      id: group.id,
      label: group.name,
    })),
    ...employeeRecipients.map((employee) => ({
      id: employee.personId,
      label: `${employee.firstName} ${employee.lastName}`,
    })),
  ];

  const visibleRecipients = showAll
    ? allRecipients
    : allRecipients.slice(0, 10);

  return (
    <>
      <div className="flex flex-wrap gap-8">
        {allChecked ? (
          <Component>{t("sendToAll")}</Component>
        ) : (
          <>
            {visibleRecipients.map((recipient) => (
              <Component key={recipient.id}>{recipient.label}</Component>
            ))}
          </>
        )}
      </div>
      <div className="flex flex-row pt-8">
        {allRecipients.length > 10 && (
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll
              ? t("showLess")
              : t("showAll", { amount: allRecipients.length })}
          </Button>
        )}
      </div>
    </>
  );
};

export default RecipientList;
