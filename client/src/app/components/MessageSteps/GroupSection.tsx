"use client";

import { FormControl, Button } from "@sk-web-gui/react";
import TreeView from "../TreeView/TreeView";
import GroupSelector from "./GroupSelector";

interface Props {
  allChecked: boolean;
}

const GroupSection = ({ allChecked }: Props) => {
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
      <p className="text-label-large">Grupper</p>
      <GroupSelector
        label="Fördefinierade grupper"
        placeholder="Välj en eller flera grupper"
        list={predefinedGroups}
        allChecked={allChecked}
      />
      <GroupSelector
        label="Sparade grupper"
        placeholder="Välj en eller flera grupper"
        list={savedGroups}
        allChecked={allChecked}
      />
      <Button
        variant="secondary"
        size="sm"
        className="w-fit"
        disabled={allChecked}
      >
        Hantera grupper
      </Button>
      <FormControl className="w-full" disabled={allChecked}>
        <p
          id="organisation-label"
          className="sk-form-label sk-form-label-md my-0"
        >
          Organisation
        </p>
        <TreeView
          itemsDescription="Valda mottagare"
          aria-labelledby="organisation-label"
        />
      </FormControl>
    </div>
  );
};

export default GroupSection;
