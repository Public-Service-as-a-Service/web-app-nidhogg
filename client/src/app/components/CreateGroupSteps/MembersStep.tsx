"use client";

import { Button } from "@sk-web-gui/react";
import { ArrowLeft, Users } from "lucide-react";
import SearchSection from "../GroupHandling/SearchSection";
import { useTranslations } from "next-intl";

interface MemberStepProps {
  onPrev: () => void;
}

const MembersStep = ({ onPrev }: MemberStepProps) => {
  const t = useTranslations("GroupHandling");

  return (
    <div className="flex flex-col gap-40">
      <h1 className="text-h3-md !m-0">{t("memberStepTitle")}</h1>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">{t("searchLabel")}</p>
        <SearchSection />
      </div>
      <div className="flex flex-row place-content-between">
        <Button variant="secondary" onClick={onPrev}>
          <ArrowLeft />
          {t("goBackButton")}
        </Button>
        <Button>
          {t("createGroupButton")} <Users />
        </Button>
      </div>
    </div>
  );
};

export default MembersStep;
