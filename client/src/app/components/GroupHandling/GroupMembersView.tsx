"use client";

import { Button } from "@sk-web-gui/react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import MemberSection from "./MemberSection";
import SearchSection from "./SearchSection";

interface GroupMembersViewProps {
  isEditing: boolean;
  isAdding: boolean;
  selectedMembers: Employee[];
  memberIdSet: Set<number>;
  onStartAddingMembers: () => void;
  onCancelAddingMembers: () => void;
  onBulkMembers: (members: Employee[]) => void;
  onRemoveMember: (memberId: number) => void;
  onGoBack: () => void;
}

const GroupMembersView = ({
  isEditing,
  isAdding,
  selectedMembers,
  memberIdSet,
  onStartAddingMembers,
  onCancelAddingMembers,
  onBulkMembers,
  onRemoveMember,
  onGoBack,
}: GroupMembersViewProps) => {
  const t = useTranslations("GroupHandling");

  if (isEditing && isAdding) {
    return (
      <SearchSection
        memberIdSet={memberIdSet}
        handleBulkMembers={onBulkMembers}
        onCancel={onCancelAddingMembers}
      />
    );
  }

  if (isEditing) {
    return (
      <div>
        <Button
          className="w-full"
          variant="secondary"
          onClick={onStartAddingMembers}
        >
          {t("addMembers")}
        </Button>
        <MemberSection
          members={selectedMembers}
          editMode={true}
          onRemoveMember={onRemoveMember}
        />
      </div>
    );
  }

  return (
    <>
      <MemberSection
        members={selectedMembers}
        editMode={false}
        onRemoveMember={onRemoveMember}
      />
      <div>
        <Button variant="secondary" rounded onClick={onGoBack}>
          <ArrowLeft /> {t("goBackButton")}
        </Button>
      </div>
    </>
  );
};

export default GroupMembersView;
