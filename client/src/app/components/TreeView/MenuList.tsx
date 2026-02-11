import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List } from "@sk-web-gui/react";
import { CheckedItem } from "@/app/interfaces/checked-item";

interface MenuListProps {
  list?: TreeMenuItem[];
  checkedItems: Record<string, CheckedItem>;
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
    <List className="menu-list-container">
      {list.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          parent={parent}
          checkedItems={checkedItems}
          isChecked={!!checkedItems[item.id]}
          onToggle={onToggle}
        />
      ))}
    </List>
  );
};

export default MenuList;
