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
      <div className="menu-item">
        <button
          className="checkbox"
          onClick={handleOnToggle}
          tabIndex={0}
          role="checkbox"
          aria-checked={isChecked}
        >
          {isChecked ? "☒" : "☐"}
        </button>
        <p>{item.name}</p>
        {hasChildren && (
          <button
            className="toggle-icon"
            onClick={handleExpand}
            tabIndex={0}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "⯅" : "⯆"}
          </button>
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
