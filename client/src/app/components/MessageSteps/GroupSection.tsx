"use client";

import { FormControl } from "@sk-web-gui/react";
import TreeView from "../TreeView/TreeView";
import GroupSelector from "./GroupSelector";
import { useTranslations } from "next-intl";

interface GroupSectionProps {
  allChecked: boolean;
  handleRecipients: (name: string) => void;
  handleBulkRecipients: (name: string[]) => void;
  selectedItems: string[];
}

const GroupSection = ({
  allChecked,
  handleRecipients,
  handleBulkRecipients,
  selectedItems,
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
        handleRecipients={handleRecipients}
        selectedItems={selectedItems}
        defaultGroup={true}
      />
      <GroupSelector
        label={t("savedGroups")}
        placeholder={t("selectGroups")}
        list={mockSavedGroups}
        allChecked={allChecked}
        handleRecipients={handleRecipients}
        selectedItems={selectedItems}
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
          handleRecipients={handleBulkRecipients}
          selectedItems={selectedItems}
        />
      </FormControl>
    </div>
  );
};

export default GroupSection;
