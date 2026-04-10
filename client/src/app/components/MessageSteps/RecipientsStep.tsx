"use client";

import { Button } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";


interface RecipientStepProps {
  onNext?: () => void;
  onPrev?: () => void;
  recipientGroups: Record<string, GroupRecipient>;
  recipientEmployees: Record<string, Employee>;
  handleGroupRecipients: (group: GroupRecipient) => void;
  handleEmployeeRecipients: (recipients: Record<string, Employee>) => void;
  allChecked: boolean;
  setAllChecked: (allChecked: boolean) => void;
}

const RecipientsStep = ({
  onNext,
  onPrev,
  recipientGroups,
  recipientEmployees,
  handleGroupRecipients,
  handleEmployeeRecipients,
  allChecked,
  setAllChecked,
}: RecipientStepProps) => {
  const t = useTranslations("RecipientsStep");
  const isDisabled =
    Object.keys(recipientGroups).length === 0 &&
    Object.keys(recipientEmployees).length === 0 &&
    !allChecked;

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center text-h2-sm">{t("sectionTitle")}</h1>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label={t("allEmployeesLabel")}
            description={t("allEmployeesDesc")}
            handleAllChecked={(isChecked) => setAllChecked(isChecked)}
            allChecked={allChecked}
          />
        </div>
        <GroupSection
          allChecked={allChecked}
          handleGroupRecipients={handleGroupRecipients}
          handleEmployeeRecipients={handleEmployeeRecipients}
          selectedGroups={recipientGroups}
          selectedEmployees={recipientEmployees}
        />
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={onPrev}>
          {t("goBackButton")}
        </Button>
        <Button disabled={isDisabled} onClick={onNext}>
          {t("nextButton")}
        </Button>
      </div>
    </div>
  );
};

export default RecipientsStep;