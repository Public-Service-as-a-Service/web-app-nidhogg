"use client";

import { FormControl, FormLabel, Combobox } from "@sk-web-gui/react";
import { GroupRecipient } from "../../dashboard/messages/page";

interface ListItem {
  id: number;
  name: string;
  default: boolean;
}

interface GroupSelectorProps {
  label: string;
  placeholder: string;
  list: ListItem[];
  allChecked: boolean;
  handleRecipients: (group: GroupRecipient) => void;
  selectedItems: Record<string, GroupRecipient>;
  defaultGroup: boolean;
}

const GroupSelector = ({
  label,
  placeholder,
  list = [],
  allChecked,
  handleRecipients,
  selectedItems,
  defaultGroup,
}: GroupSelectorProps) => {
  const isDefault = defaultGroup === true;
  const filteredGroups = list.filter((g) => g.default === isDefault);

  const selectedValues = Object.values(selectedItems);

  const currentSelection = selectedValues
    .filter((selected) =>
      filteredGroups.some((group) => group.id === selected.id),
    )
    .map((g) => g.name);

  return (
    <FormControl className="w-full" disabled={allChecked}>
      <FormLabel>{label}</FormLabel>
      <Combobox multiple placeholder={placeholder} value={currentSelection}>
        <Combobox.Input className="w-full" />
        <Combobox.List>
          {filteredGroups.map((group) => (
            <Combobox.Option
              key={group.id}
              value={group.name}
              onChange={() =>
                handleRecipients({ id: group.id, name: group.name })
              }
            >
              {group.name}
            </Combobox.Option>
          ))}
        </Combobox.List>
      </Combobox>
    </FormControl>
  );
};

export default GroupSelector;
