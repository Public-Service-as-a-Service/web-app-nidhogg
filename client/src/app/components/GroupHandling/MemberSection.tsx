"use client";

import MemberCard from "./MemberCard";
import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SquarePen, ArrowLeft, Save } from "lucide-react";
import { Employee } from "@/app/interfaces/employee";

interface MemberSectionProps {
  members: Employee[];
  editMode: boolean;
  handleEditMode: () => void;
}

const MemberSection = ({
  members = [],
  editMode,
  handleEditMode,
}: MemberSectionProps) => {
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
          <MemberCard key={member.id} member={member} editMode={editMode} />
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" rounded={true} onClick={handleGoBack}>
          <ArrowLeft />
          {t("goBackButton")}
        </Button>
        {!editMode ? (
          <Button onClick={handleEditMode}>
            {t("editButton")}
            <SquarePen />
          </Button>
        ) : (
          <Button onClick={handleEditMode}>
            {t("saveButton")}
            <Save />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemberSection;
