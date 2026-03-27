"use client";

import { useState } from "react";
import { Button } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";
import RecipientItem from "../RecipientItem";

interface RecipientListProps {
  recipientGroups: Record<string, GroupRecipient>;
  recipientEmployees: Record<string, Employee>;
  allChecked: boolean;
}

const RecipientList = ({
  recipientGroups,
  recipientEmployees,
  allChecked
}: RecipientListProps) => {
  const [showAll, setShowAll] = useState(false);

  const t = useTranslations("MessageStepsCommon");

  const employeeRecipients = Object.values(recipientEmployees);
  const groupRecipients = Object.values(recipientGroups);

  const allRecipients = [
    ...groupRecipients.map((group) => ({
      id: group.id,
      firstName: "",
      lastName: "",
      orgName: group.name,
      deliveryStatus: "DELIVERED",
    })),
    ...employeeRecipients.map((employee) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName, 
      orgName: employee.orgName,
      deliveryStatus: "DELIVERED",
    })),
  ];

  const visibleRecipients = showAll
    ? allRecipients
    : allRecipients.slice(0, 10);

  return (
    <>
      <div className="flex flex-col">
        {allChecked ? (
          <RecipientItem recipient={{firstName: t("sendToAll"), lastName: "", deliveryStatus: "DELIVERED"}} />
        ) : (
          <>
            {visibleRecipients.map((recipient) => (
              <RecipientItem key={recipient.id} recipient={recipient} />
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
