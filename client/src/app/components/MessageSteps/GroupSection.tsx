"use client";

import { FormControl } from "@sk-web-gui/react";
import TreeView from "../TreeView/TreeView";
import GroupSelector from "./GroupSelector";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { GroupRecipient } from "../../dashboard/messages/page";
import { useGroups } from "@/app/services/useGroups";
import { API_ENDPOINTS } from "@/app/constants";
import { useCurrentUser } from "@/app/services/useCurrentUser";

interface GroupSectionProps {
  allChecked: boolean;
  handleGroupRecipients: (group: GroupRecipient) => void;
  handleEmployeeRecipients: (recipients: Record<string, Employee>) => void;
  handleOrgNodeRecipients: (orgNodes: Record<string, boolean>) => void;
  selectedGroups: Record<string, GroupRecipient>;
  selectedEmployees: Record<string, Employee>;
  selectedOrgNodes: Record<string, boolean>;
}

const GroupSection = ({
  allChecked,
  handleGroupRecipients,
  handleEmployeeRecipients,
  handleOrgNodeRecipients,
  selectedGroups,
  selectedEmployees,
  selectedOrgNodes,
}: GroupSectionProps) => {
  const t = useTranslations("GroupSection");

  const defaultGroups = [
    {
      id: "managers",
      name: t("allManagers"),
      endpoint: API_ENDPOINTS.allManagers,
      default: true,
    },
    {
      id: "it-prod",
      name: t("itProd"),
      endpoint: API_ENDPOINTS.itProd,
      default: true,
    },
  ];

  const { data: currentUser } = useCurrentUser();
  const { data: groups } = useGroups(currentUser?.email ?? "");
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
        list={defaultGroups}
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
          aria-labelledby={t("orgTree")}
          handleRecipients={handleEmployeeRecipients}
          selectedItems={selectedEmployees}
          selectedOrgNodes={selectedOrgNodes}
          handleOrgNodeRecipients={handleOrgNodeRecipients}
        />
      </FormControl>
    </div>
  );
};

export default GroupSection;
