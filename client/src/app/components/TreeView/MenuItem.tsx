import React, { useState } from "react";
import MenuList from "./MenuList";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List, Button, Checkbox } from "@sk-web-gui/react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface MenuItemProps {
  item: TreeMenuItem;
  parent?: TreeMenuItem;
  isChecked: boolean;
  checkedItems: Record<string, boolean>;
  onToggle: (name: TreeMenuItem, parent?: TreeMenuItem) => void;
  onExpand: (name: TreeMenuItem, parent?: TreeMenuItem) => Promise<void> | void;
}

const MenuItem = ({
  item,
  parent,
  isChecked,
  onToggle,
  onExpand,
  checkedItems,
}: MenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const hasLoadedChildren = !!item.children && item.children.length > 0;
  const canExpand =
    item.type === "org" &&
    (!item.childrenLoaded || hasLoadedChildren || !!item.childrenError);

  const handleExpand = async () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }

    setIsExpanded(true);
    await onExpand(item, parent);
  };

  return (
    <List.Item className="pt-0 [li&::before]:!hidden [&::before]:!hidden [&::before]:!content-none">
      <List.Text className={canExpand ? "menu-item parent-item" : "menu-item"}>
        <span className="menu-item-left">
          <Checkbox
            onClick={() => onToggle(item, parent)}
            checked={isChecked}
            tabIndex={0}
            role="checkbox"
            aria-checked={isChecked}
            disabled={item.childrenLoading}
          />
        </span>

        <span className="menu-item-center px-5">{item.name}</span>

        {canExpand && (
          <Button
            iconButton={true}
            variant="ghost"
            size="sm"
            onClick={() => {
              void handleExpand();
            }}
            tabIndex={0}
            aria-expanded={isExpanded}
            className="menu-item-right"
            disabled={item.childrenLoading}
          >
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </Button>
        )}
      </List.Text>
      {isExpanded && hasLoadedChildren && (
        <MenuList
          list={item.children}
          parent={item}
          checkedItems={checkedItems}
          onToggle={onToggle}
          onExpand={onExpand}
        />
      )}
    </List.Item>
  );
};

export default MenuItem;
