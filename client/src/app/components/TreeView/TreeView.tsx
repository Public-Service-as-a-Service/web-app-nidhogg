import React, { useState } from "react";
import MenuList from "./MenuList";
import menus from "./data";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

interface TreeViewProps {
  itemsDescription: string;
}

const TreeView = ({ itemsDescription }: TreeViewProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: TreeMenuItem, parent?: TreeMenuItem) => {
    setCheckedItems((prev) => {
      const newState = { ...prev };

      const newValue = !prev[item.name];
      newState[item.name] = newValue;

      if (item.children) {
        item.children.forEach((child) => {
          newState[child.name] = newValue;
        });
      }

      if (parent) {
        const allChildrenUnchecked = parent.children!.every(
          (child) => newState[child.name] === false
        );
        const allChildrenChecked = parent.children!.every(
          (child) => newState[child.name] === true
        );

        if (allChildrenChecked) {
          newState[parent.name] = true;
        } else if (allChildrenUnchecked) {
          newState[parent.name] = false;
        } else {
          newState[parent.name] = false;
        }
      }

      return newState;
    });
  };

  const selectedItems = Object.keys(checkedItems).filter(
    (key) => checkedItems[key]
  );

  return (
    <div className="tree-view-container">
      <MenuList
        list={menus}
        checkedItems={checkedItems}
        onToggle={toggleItem}
      />
      <div className="items-container">
        {itemsDescription}
        {selectedItems.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </div>
  );
};

export default TreeView;
