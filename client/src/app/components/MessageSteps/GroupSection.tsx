"use client";

import { FormControl } from "@sk-web-gui/react";
import TreeView from "../TreeView/TreeView";
import GroupSelector from "./GroupSelector";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";

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
    { id: 1, name: "Krisgrupp", default: true },
    { id: 2, name: "IT-jour", default: true },
  ];

  const mockSavedGroups = [
    { id: 1, name: "Team Nidhogg", default: false },
    { id: 2, name: "Nidhoggs krishanterare", default: false },
  ];

  return (
    <div
      className={`flex flex-col gap-14 ${
        allChecked ? "opacity-40" : "opacity-100"
      }`}
    >
      <p className="text-label-large pt-10">{t("sectionTitle")}</p>
      <GroupSelector
        label={t("predefinedGroups")}
        placeholder={t("selectGroups")}
        list={mockPredefinedGroups}
        allChecked={allChecked}
        handleRecipients={handleGroupRecipients}
        selectedItems={selectedGroups}
        defaultGroup={true}
      />
      <GroupSelector
        label={t("savedGroups")}
        placeholder={t("selectGroups")}
        list={mockSavedGroups}
        allChecked={allChecked}
        handleRecipients={handleGroupRecipients}
        selectedItems={selectedGroups}
        defaultGroup={false}
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
