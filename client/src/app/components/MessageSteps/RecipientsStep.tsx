"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";
import { useState, useEffect } from "react";

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
  const [disabled, setDisabled] = useState<boolean>(true);

  const router = useRouter();
  const t = useTranslations("RecipientsStep");

  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
  };

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    if (recipients.length >= 1 || allChecked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [recipients, allChecked]);

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">{t("sectionTitle")}</p>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label={t("allManagersLabel")}
            description={t("allManagersDesc")}
            allChecked={allChecked}
            handleItems={handleRecipients}
            items={recipients}
            disabled={allChecked}
          />
          <CheckboxCard
            label={t("allEmployeesLabel")}
            description={t("allEmployeesDesc")}
            allChecked={allChecked}
            handleAllChecked={handleAllChecked}
            handleItems={handleRecipients}
            items={recipients}
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
        <Button disabled={disabled} onClick={onNext}>
          {t("nextButton")}
        </Button>
      </div>
    </div>
  );
};

export default RecipientsStep;
