"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";
import { useOrganization } from "@/app/services/useOrganization";
import Loading from "../LoadingSpinner";

interface RecipientStepProps {
  onNext?: () => void;
  recipients: string[];
  handleRecipients: (name: string) => void;
  allChecked: boolean;
  setAllChecked: (allChecked: boolean) => void;
}

const RecipientsStep = ({
  onNext,
  recipients,
  handleRecipients,
  allChecked,
  setAllChecked,
}: RecipientStepProps) => {
  const router = useRouter();
  const t = useTranslations("RecipientsStep");
  const isDisabled = recipients.length === 0 && !allChecked;

  const { data: organization, isLoading } = useOrganization(13);
  console.log(organization?.name);

  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
  };

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  const commonProps = {
    allChecked,
    handleItems: handleRecipients,
    items: recipients,
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center sm:text-xl md:text-2xl">
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
          handleRecipients={handleRecipients}
          selectedItems={recipients}
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
