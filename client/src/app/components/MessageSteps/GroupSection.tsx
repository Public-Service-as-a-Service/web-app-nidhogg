"use client";

import { FormControl } from "@sk-web-gui/react";
import TreeView from "../TreeView/TreeView";
import GroupSelector from "./GroupSelector";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";
import { useGroups } from "@/app/services/useGroups";

interface GroupSectionProps {
  allChecked: boolean;
  handleGroupRecipients: (group: GroupRecipient) => void;
  handleEmployeeRecipients: (recipients: Record<string, Employee>) => void;
  selectedGroups: Record<string, GroupRecipient>;
  selectedEmployees: Record<string, Employee>;
}

const GroupSection = ({
  allChecked,
  handleGroupRecipients,
  handleEmployeeRecipients,
  selectedGroups,
  selectedEmployees,
}: GroupSectionProps) => {
  const t = useTranslations("GroupSection");

  const mockPredefinedGroups = [
    { id: 101, name: "Krisgrupp", default: true },
    { id: 102, name: "IT-jour", default: true },
  ];

  const { data: groups } = useGroups(1); //ska vara email
  const customGroups = groups?.map((g) => ({ ...g, default: false })) || [];

  const commonProps = {
    placeholder: t("selectGroups"),
    allChecked,
    handleRecipients: handleGroupRecipients,
    selectedItems: selectedGroups,
  };

  return (
    <div
      className={`flex flex-col gap-14 ${
        allChecked ? "opacity-40" : "opacity-100"
      }`}
    >
      <p className="text-label-large pt-10">{t("sectionTitle")}</p>
      <GroupSelector
        label={t("predefinedGroups")}
        list={mockPredefinedGroups}
        defaultGroup={true}
        {...commonProps}
      />
      <GroupSelector
        label={t("savedGroups")}
        list={customGroups}
        defaultGroup={false}
        {...commonProps}
      />
      <FormControl className="w-full" disabled={allChecked}>
        <p
          id="organisation-label"
          className="sk-form-label sk-form-label-md my-0"
        >
          {t("organization")}
        </p>
        <TreeView
          aria-labelledby="organization-label"
          handleRecipients={handleEmployeeRecipients}
          selectedItems={selectedEmployees}
        />
      </FormControl>
    </div>
  );
};

export default GroupSection;
