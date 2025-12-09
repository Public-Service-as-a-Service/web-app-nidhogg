import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List } from "@sk-web-gui/react";

interface MenuListProps {
  list?: TreeMenuItem[];
  checkedItems: Record<string, boolean>;
  parent?: TreeMenuItem;
  onToggle: (item: TreeMenuItem, parent?: TreeMenuItem) => void;
}

const MenuList = ({
  list = [],
  checkedItems,
  parent,
  onToggle,
}: MenuListProps) => {
  return (
    <List className="no-style-list menu-list-container">
      {list.map((item) => (
        <MenuItem
          key={item.name}
          item={item}
          parent={parent}
          checkedItems={checkedItems}
          isChecked={checkedItems[item.name] || false}
          onToggle={onToggle}
        />
      ))}
    </List>
  );
};

export default MenuList;
