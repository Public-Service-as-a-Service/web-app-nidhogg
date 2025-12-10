import React, { useState } from "react";
import MenuList from "./MenuList";
import menus from "./data";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import SelectedList from "./SelectedList";

interface TreeViewProps {
  itemsDescription: string;
}

const TreeView = ({ itemsDescription }: TreeViewProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: TreeMenuItem) => {
    setCheckedItems((prev) => {
      const newState = { ...prev };

      const isChecked = !prev[item.name];

      const toggleDescendants = (node: TreeMenuItem, value: boolean) => {
        newState[node.name] = value;
        node.children?.forEach((child) => toggleDescendants(child, value));
      };
      toggleDescendants(item, isChecked);

      const findById = (
        nodes: TreeMenuItem[],
        id: string
      ): TreeMenuItem | undefined => {
        for (const n of nodes) {
          if (n.id === id) return n;
          if (n.children) {
            const found = findById(n.children, id);
            if (found) return found;
          }
        }
        return undefined;
      };

      const updateParents = (node: TreeMenuItem) => {
        if (!node.parentId) return;

        const parent = findById(menus, node.parentId);
        if (!parent) return;

        const childValues = parent.children!.map(
          (child) => newState[child.name] ?? false
        );

        const allChecked = childValues.every((value) => value === true);

        if (allChecked) newState[parent.name] = true;
        else newState[parent.name] = false;

        updateParents(parent);
      };

      updateParents(item);

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
      <div className="pt-30">
        {itemsDescription}
        <SelectedList
          listItems={selectedItems}
        />
      </div>
    </div>
  );
};

export default TreeView;
