import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List } from "@sk-web-gui/react";

interface MenuListProps {
  list?: TreeMenuItem[];
  checkedItems: Record<string, boolean>;
  parent?: TreeMenuItem;
  onToggle: (item: TreeMenuItem, parent?: TreeMenuItem) => void;
  onExpand: (item: TreeMenuItem, parent?: TreeMenuItem) => Promise<void> | void;
}

const MenuList = ({
  list = [],
  checkedItems,
  parent,
  onToggle,
  onExpand,
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
          onExpand={onExpand}
        />
      ))}
    </List>
  );
};

export default MenuList;
