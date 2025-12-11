import React, { useState } from "react";
import MenuList from "./MenuList";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List, Button, Checkbox } from "@sk-web-gui/react";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";

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
    <List.Item className="pt-5 [li&::before]:!hidden [&::before]:!hidden [&::before]:!content-none">
      <List.Text
        className={hasChildren ? "menu-item parent-item" : "menu-item"}
      >
        <span className="menu-item-left">
          <Checkbox
            onClick={handleOnToggle}
            checked={isChecked}
            tabIndex={0}
            role="checkbox"
            aria-checked={isChecked}
          ></Checkbox>

          {hasChildren && (
            <Button variant="ghost" size="sm">
              <Folder />
            </Button>
          )}
        </span>

        <span className="menu-item-center px-5">{item.name}</span>

        {hasChildren && (
          <Button
            iconButton={true}
            variant="ghost"
            size="sm"
            onClick={handleExpand}
            tabIndex={0}
            aria-expanded={isExpanded}
            className="menu-item-right"
          >
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </Button>
        )}
      </List.Text>
      {hasChildren && isExpanded && (
        <MenuList
          list={item.children}
          parent={item}
          checkedItems={checkedItems}
          onToggle={onToggle}
        />
      )}
    </List.Item>
  );
};

export default MenuItem;
