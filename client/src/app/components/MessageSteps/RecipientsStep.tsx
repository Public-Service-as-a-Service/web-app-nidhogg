"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";
import { PAGE_ROUTES } from "@/app/constants";

interface RecipientStepProps {
  onNext?: () => void;
  recipientGroups: Record<string, GroupRecipient>;
  recipientEmployees: Record<string, Employee>;
  recipientOrgNodes: Record<string, boolean>;
  handleGroupRecipients: (group: GroupRecipient) => void;
  handleEmployeeRecipients: (recipients: Record<string, Employee>) => void;
  handleOrgNodeRecipients: (orgNodes: Record<string, boolean>) => void;
  allChecked: boolean;
  setAllChecked: (allChecked: boolean) => void;
}

const RecipientsStep = ({
  onNext,
  recipientGroups,
  recipientEmployees,
  recipientOrgNodes,
  handleGroupRecipients,
  handleEmployeeRecipients,
  handleOrgNodeRecipients,
  allChecked,
  setAllChecked,
}: RecipientStepProps) => {
  const router = useRouter();
  const t = useTranslations("RecipientsStep");

  const isDisabled =
    Object.keys(recipientGroups).length === 0 &&
    Object.keys(recipientEmployees).length === 0 &&
    !allChecked;

  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
  };

  const handleGoBack = () => {
    router.push(PAGE_ROUTES.dashboard);
  };

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center text-h2-sm">{t("sectionTitle")}</h1>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label={t("allEmployeesLabel")}
            description={t("allEmployeesDesc")}
            handleAllChecked={handleAllChecked}
            allChecked={allChecked}
          />
        </div>
        <GroupSection
          allChecked={allChecked}
          handleGroupRecipients={handleGroupRecipients}
          handleEmployeeRecipients={handleEmployeeRecipients}
          handleOrgNodeRecipients={handleOrgNodeRecipients}
          selectedGroups={recipientGroups}
          selectedEmployees={recipientEmployees}
          selectedOrgNodes={recipientOrgNodes}
        />
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={handleGoBack}>
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
