import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

interface MenuListProps {
  list?: TreeMenuItem[];
  checkedItems: Record<string, boolean>;
  onToggle: (item: TreeMenuItem) => void;
}

const MenuList = ({ list = [], checkedItems, onToggle }: MenuListProps) => {
  return (
    <div>
      <ul className="menu-list-container">
        {list.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
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
