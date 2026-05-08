import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List } from "@sk-web-gui/react";

interface MenuListProps {
  list?: TreeMenuItem[];
  checkedItems: Record<string, boolean>;
  onToggle: (item: TreeMenuItem) => void;
  onNavigate: (item: TreeMenuItem) => Promise<void> | void;
}

const MenuList = ({
  list = [],
  checkedItems,
  onToggle,
  onNavigate,
}: MenuListProps) => {
  return (
    <List className="menu-list-container">
      {list.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          isChecked={!!checkedItems[item.id]}
          onToggle={onToggle}
          onNavigate={onNavigate}
        />
      ))}
    </List>
  );
};

export default MenuList;
