import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

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
    <div>
      <ul className="menu-list-container">
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
      </ul>
    </div>
  );
};

export default MenuList;
