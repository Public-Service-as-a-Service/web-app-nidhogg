"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";

interface Props {
  onNext?: () => void;
}

const RecipientsStep = ({ onNext }: Props) => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const t = useTranslations("RecipientsStep");
  const router = useRouter();

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
  };

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center sm:text-xl md:text-2xl">
        {t("sectionTitle")}
      </h1>
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
        <GroupSection allChecked={allChecked} />
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
