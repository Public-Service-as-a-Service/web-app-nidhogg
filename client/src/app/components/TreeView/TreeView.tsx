import React, { useState } from "react";
import MenuList from "./MenuList";
import menus from "./data";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

type SelectedProps = {
  name: string;
};

const TreeView = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedItems, setSelectedItems] = useState<SelectedProps[]>([]);

  const toggleItem = (item: TreeMenuItem) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item.name]: !prev[item.name],
    }));

    const found = selectedItems.find(({ name }) => name === item.name);

    let filteredList = { ...selectedItems };
    filteredList = selectedItems.filter(({ name }) => name !== item.name);
    
    setSelectedItems(found ? filteredList : [...selectedItems, { name: item.name }])
  };

  console.log(selectedItems);

  return (
    <div className="tree-view-container">
      <MenuList
        list={menus}
        checkedItems={checkedItems}
        onToggle={toggleItem}
      />
      <div>
        Valda mottagare:
        {selectedItems.map((item) => (
          <p key={item.name}>{item.name}</p>
        ))}
      </div>
    </div>
  );
};

export default TreeView;
