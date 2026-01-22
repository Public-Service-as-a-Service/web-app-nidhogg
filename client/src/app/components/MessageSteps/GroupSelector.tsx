"use client";

import { FormControl, FormLabel, Combobox } from "@sk-web-gui/react";

interface ListItem {
  id: number;
  name: string;
}

interface GroupSelectorProps {
  label: string;
  placeholder: string;
  list: ListItem[];
  allChecked: boolean;
  handleRecipients: (name: string) => void;
}

const GroupSelector = ({
  label,
  placeholder,
  list = [],
  allChecked,
  handleRecipients,
}: GroupSelectorProps) => {
  return (
    <FormControl className="w-full" disabled={allChecked}>
      <FormLabel>{label}</FormLabel>
      <Combobox multiple placeholder={placeholder}>
        <Combobox.Input className="w-full" />
        <Combobox.List>
          {list.map((group) => (
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
