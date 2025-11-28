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

      if (!item.children) {
        newState[item.name] = !prev[item.name];
      } else {
        const newValue = !prev[item.name];
        newState[item.name] = newValue;

        item.children.forEach((child) => {
          newState[child.name] = newValue;
        });
      }

      return newState;
    });
  };

  const selectedItems = Object.keys(checkedItems).filter(
    (key) => checkedItems[key]
  );

  // console.log(checkedItems);

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
