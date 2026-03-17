"use client";

import MemberCard from "./MemberCard";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";

interface MemberSectionProps {
  members: Employee[];
  editMode: boolean;
  onRemoveMember?: (memberId: number) => void;
}

const MemberSection = ({
  members = [],
  editMode,
  onRemoveMember,
}: MemberSectionProps) => {
  const t = useTranslations("GroupHandling");

  return (
    <div className="flex flex-col pt-16">
      <p className="text-label-large">{t("membersLabel")}</p>
      <div className="flex flex-col gap-12 pb-28">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            editMode={editMode}
            onRemove={onRemoveMember}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberSection;
