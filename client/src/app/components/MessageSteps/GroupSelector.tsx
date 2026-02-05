"use client";

import { FormControl, FormLabel, Combobox } from "@sk-web-gui/react";

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
  handleRecipients: (name: string) => void;
  selectedItems: string[];
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

  const currentSelection = selectedItems.filter((selectedName) =>
    filteredGroups.some((group) => group.name === selectedName)
  );

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
              onChange={() => handleRecipients(group.name)}
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
