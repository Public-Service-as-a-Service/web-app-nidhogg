"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";

interface RecipientStepProps {
  onNext?: () => void;
  recipients: string[];
  handleRecipients: (name: string) => void;
}

const RecipientsStep = ({
  onNext,
  recipients,
  handleRecipients,
}: RecipientStepProps) => {
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const t = useTranslations("RecipientsStep");

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
  };

  const router = useRouter();

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  console.log(recipients); //TA BORT SEN

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">{t("sectionTitle")}</p>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label={t("allManagersLabel")}
            description={t("allManagersDesc")}
          />
          <CheckboxCard
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
        <Button onClick={onNext}>{t("nextButton")}</Button>
      </div>
    </div>
  );
};

export default RecipientsStep;
