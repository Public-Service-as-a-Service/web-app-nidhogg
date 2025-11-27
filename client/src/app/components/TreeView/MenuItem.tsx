import React from "react";
import MenuList from "./MenuList";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

interface MenuItemProps {
  item: TreeMenuItem;
  isChecked: boolean;
  checkedItems: Record<string, boolean>;
  onToggle: (name: TreeMenuItem) => void;
}

const MenuItem = ({
  item,
  isChecked,
  onToggle,
  checkedItems,
}: MenuItemProps) => {
  const hasChildren = item.children && item.children.length > 0;
  const handleOnToggle = () => {
    onToggle(item);
  };

  return (
    <li>
      <div className="menu-item" tabIndex={0}>
        <p>{item.name}</p>
        <div
          className={`checkbox ${isChecked ? "checked" : "not-checked"}`}
          onClick={handleOnToggle}
        />
      </div>
      {hasChildren && isChecked && (
        <MenuList
          list={item.children}
          checkedItems={checkedItems}
          onToggle={onToggle}
        />
      )}
    </li>
  );
};

export default MenuItem;
