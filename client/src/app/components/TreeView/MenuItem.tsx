import React, { useState } from "react";
import MenuList from "./MenuList";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

interface MenuItemProps {
  item: TreeMenuItem;
  parent?: TreeMenuItem;
  isChecked: boolean;
  checkedItems: Record<string, boolean>;
  onToggle: (name: TreeMenuItem, parent?: TreeMenuItem) => void;
}

const MenuItem = ({
  item,
  parent,
  isChecked,
  onToggle,
  checkedItems,
}: MenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const hasChildren = item.children && item.children.length > 0;
  const handleOnToggle = () => {
    onToggle(item, parent);
  };

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <li>
      <div className="menu-item" tabIndex={0}>
        <div className="checkbox" onClick={handleOnToggle}>
          {isChecked ? "☒" : "☐"}
        </div>
        <p>{item.name}</p>
        {hasChildren && (
          <div className="toggle-icon" onClick={handleExpand}>
            {isExpanded ? "⯅" : "⯆"}
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <MenuList
          list={item.children}
          parent={item}
          checkedItems={checkedItems}
          onToggle={onToggle}
        />
      )}
    </li>
  );
};

export default MenuItem;
