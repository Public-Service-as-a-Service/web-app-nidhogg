"use client";

import { Member } from "@/app/interfaces/member";
import MemberCard from "./MemberCard";
import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SquarePen, ArrowLeft } from "lucide-react";

interface MemberSectionProps {
  members: Member[];
}

const MemberSection = ({ members = [] }: MemberSectionProps) => {
  const t = useTranslations("GroupHandling");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col pt-16">
      <p className="text-label-large">{t("membersLabel")}</p>
      <div className="flex flex-col gap-12 pb-28">
        {members.map((member) => (
          <MemberCard
            key={member.employeeId + member.groupId}
            member={member}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" rounded={true} onClick={handleGoBack}>
          <ArrowLeft />
          {t("goBackButton")}
        </Button>
        <Button>
          {t("editButton")}
          <SquarePen />
        </Button>
      </div>
    </div>
  );
};

export default MemberSection;
