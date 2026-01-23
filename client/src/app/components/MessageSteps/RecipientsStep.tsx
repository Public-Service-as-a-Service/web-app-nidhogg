"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";

interface RecipientStepProps {
  onNext?: () => void;
  recipients: string[];
  handleRecipients: (name: string) => void;
  allChecked: boolean;
  setAllChecked: (allChecked: boolean) => void
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

  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
  };

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">{t("sectionTitle")}</p>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label={t("allManagersLabel")}
            description={t("allManagersDesc")}
            allChecked={allChecked}
            handleRecipients={handleRecipients}
            recipients={recipients}
            disabled={allChecked}
          />
          <CheckboxCard
            label={t("allEmployeesLabel")}
            description={t("allEmployeesDesc")}
            handleAllChecked={handleAllChecked}
            handleRecipients={handleRecipients}
            recipients={recipients}
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
        <Button onClick={onNext}>{t("nextButton")}</Button>
      </div>
    </div>
  );
};

export default RecipientsStep;
