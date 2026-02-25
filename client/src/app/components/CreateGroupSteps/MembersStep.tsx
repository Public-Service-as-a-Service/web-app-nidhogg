"use client";

import { Button } from "@sk-web-gui/react";
import { ArrowLeft, Trash, Users } from "lucide-react";
import SearchSection from "../GroupHandling/SearchSection";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { useMemo } from "react";

interface MemberStepProps {
  onPrev: () => void;
  members: Employee[];
  handleBulkMembers: (recipientIds: Employee[]) => void;
}

const MembersStep = ({
  onPrev,
  members,
  handleBulkMembers,
}: MemberStepProps) => {
  const t = useTranslations("GroupHandling");

  const memberIdSet = useMemo(
    () => new Set(members.map((member) => member.id)),
    [members],
  );

  return (
    <div className="flex flex-col gap-40">
      <h1 className="text-h3-md !m-0">{t("memberStepTitle")}</h1>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">{t("searchLabel")}</p>
        <SearchSection
          memberIdSet={memberIdSet}
          handleBulkMembers={handleBulkMembers}
        />
      </div>
      <div className="flex flex-col gap-6">
        {members.length > 0 && (
          <h2 className="text-h4-md !m-0">{t("addedMembersHeading")}</h2>
        )}
        {members.map((m) => (
          <div className="flex flex-row place-content-between" key={m.id}>
            <p className="self-center">
              {m.firstName} {m.lastName}
            </p>
            <Button iconButton={true}>
              <Trash />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-row place-content-between">
        <Button variant="secondary" onClick={onPrev}>
          <ArrowLeft />
          {t("goBackButton")}
        </Button>
        <Button disabled={members.length === 0}>
          {t("createGroupButton")} <Users />
        </Button>
      </div>
    </div>
  );
};

export default MembersStep;
