import React, { useState } from "react";
import MenuList from "./MenuList";
import menus from "./data";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

const TreeView = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: TreeMenuItem) => {
    setCheckedItems((prev) => {
      const newState = { ...prev };

      newState[item.name] = !prev[item.name];

      if (item.children) {
        item.children.forEach((child) => {
          newState[child.name] = !prev[child.name];
        });
      }

      return newState;
    });
  };

  const selectedItems = Object.keys(checkedItems).filter(
    (key) => checkedItems[key]
  );

  console.log(checkedItems);

  return (
    <div className="tree-view-container">
      <MenuList
        list={menus}
        checkedItems={checkedItems}
        onToggle={toggleItem}
      />
      <div>
        Valda mottagare:
        {selectedItems.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </div>
  );
};

export default TreeView;
