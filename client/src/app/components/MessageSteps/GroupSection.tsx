"use client";

import { FormControl, Button } from "@sk-web-gui/react";
import TreeView from "../TreeView/TreeView";
import GroupSelector from "./GroupSelector";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface GroupSectionProps {
  allChecked: boolean;
}

const GroupSection = ({ allChecked }: GroupSectionProps) => {
  const t = useTranslations("GroupSection");
  const router = useRouter();

  const handleManageGroups = () => {
    router.push("/dashboard/groups");
  };

  const predefinedGroups = [
    { id: 1, name: "Krisgrupp" },
    { id: 2, name: "IT-jour" },
  ];

  const savedGroups = [
    { id: 1, name: "Team Nidhogg" },
    { id: 2, name: "Nidhoggs krishanterare" },
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
        list={predefinedGroups}
        allChecked={allChecked}
      />
      <GroupSelector
        label={t("savedGroups")}
        placeholder={t("selectGroups")}
        list={savedGroups}
        allChecked={allChecked}
      />
      <Button
        variant="secondary"
        size="sm"
        className="w-fit"
        disabled={allChecked}
        onClick={handleManageGroups}
      >
        {t("handleGroups")}
      </Button>
      <FormControl className="w-full" disabled={allChecked}>
        <p
          id="organisation-label"
          className="sk-form-label sk-form-label-md my-0"
        >
          {t("organization")}
        </p>
        <TreeView
          itemsDescription={t("recipients")}
          aria-labelledby="organisation-label"
        />
      </FormControl>
    </div>
  );
};

export default GroupSection;
