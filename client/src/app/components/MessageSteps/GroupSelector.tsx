"use client";

import { FormControl, FormLabel, Combobox } from "@sk-web-gui/react";

interface ListItem {
  id: number;
  name: string;
}

interface Props {
  label: string;
  placeholder: string;
  list: ListItem[];
  allChecked: boolean;
}

const GroupSelector = ({
  label,
  placeholder,
  list = [],
  allChecked,
}: Props) => {
  return (
    <FormControl className="w-full" disabled={allChecked}>
      <FormLabel> {label} </FormLabel>
      <Combobox multiple placeholder={placeholder}>
        <Combobox.Input className="w-full" />
        <Combobox.List>
          {list.map((group) => (
            <Combobox.Option key={group.id} value={group.name}>
              {group.name}
            </Combobox.Option>
          ))}
        </Combobox.List>
      </Combobox>
    </FormControl>
  );
};

export default GroupSelector;
