import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List } from "@sk-web-gui/react";

interface MenuListProps {
  list?: TreeMenuItem[];
  checkedItems: Record<string, boolean>;
  onToggle: (item: TreeMenuItem) => Promise<void> | void;
  onNavigate: (item: TreeMenuItem) => Promise<void> | void;
  isSearchActive: boolean;
}

const MenuList = ({
  list = [],
  checkedItems,
  onToggle,
  onNavigate,
  isSearchActive,
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
          isSearchActive={isSearchActive}
        />
      ))}
    </List>
  );
};

export default MenuList;
