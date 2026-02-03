"use client";

import { Member } from "@/app/interfaces/member";
import MemberCard from "./MemberCard";
import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface MemberSectionProps {
  members: Member[];
}

const MemberSection = ({ members = [] }: MemberSectionProps) => {
  const router = useRouter();
  const t = useTranslations("GroupHandling");

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 pb-28">
        {members.map((member) => (
          <MemberCard
            key={member.employeeId + member.groupId}
            member={member}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={handleGoBack}>
          {t("goBackButton")}
        </Button>
        <Button>{t("addMembersButton")}</Button>
      </div>
    </div>
  );
};

export default MemberSection;
