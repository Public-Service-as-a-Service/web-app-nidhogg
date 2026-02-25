"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";
import { Employee } from "@/app/interfaces/employee";

interface RecipientStepProps {
  onNext?: () => void;
  recipientGroups: string[];
  recipientsById: Record<string, Employee>;
  handleGroupRecipients: (name: string) => void;
  handleEmployeeRecipients: (recipients: Record<string, Employee>) => void;
  allChecked: boolean;
  setAllChecked: (allChecked: boolean) => void;
}

const RecipientsStep = ({
  onNext,
  recipientGroups,
  recipientsById,
  handleGroupRecipients,
  handleEmployeeRecipients,
  allChecked,
  setAllChecked,
}: RecipientStepProps) => {
  const router = useRouter();
  const t = useTranslations("RecipientsStep");
  
  const isDisabled =
    recipientGroups.length === 0 &&
    Object.keys(recipientsById).length === 0 &&
    !allChecked;

  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
  };

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  const commonProps = {
    allChecked,
    handleItems: handleGroupRecipients,
    items: recipientGroups,
  };

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center text-h2-sm">
        {t("sectionTitle")}
      </h1>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            {...commonProps}
            label={t("allManagersLabel")}
            description={t("allManagersDesc")}
            disabled={allChecked}
          />
          <CheckboxCard
            {...commonProps}
            label={t("allEmployeesLabel")}
            description={t("allEmployeesDesc")}
            handleAllChecked={handleAllChecked}
          />
        </div>
        <GroupSection
          allChecked={allChecked}
          handleGroupRecipients={handleGroupRecipients}
          handleEmployeeRecipients={handleEmployeeRecipients}
          selectedGroups={recipientGroups}
          selectedEmployees={recipientsById}
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
