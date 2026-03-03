import React from "react";
import MenuList from "./MenuList";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { useTreeMenu } from "@/app/hooks/useTreeMenu";
import Loading from "../LoadingSpinner";
import { Employee } from "@/app/interfaces/employee";

interface TreeViewProps {
  "aria-labelledby"?: string;
  handleRecipients: (recipients: Record<string, Employee>) => void;
  selectedItems: Record<string, Employee>;
}

const TreeView = ({
  "aria-labelledby": ariaLabelledby,
  handleRecipients,
  selectedItems,
}: TreeViewProps) => {
  const { items, isLoading } = useTreeMenu();

  const checkedItems: Record<string, boolean> = {};

  const checkNode = (node: TreeMenuItem): boolean => {
    if (node.type === "emp") {
      const isChecked = !!selectedItems[node.id];
      if (isChecked) checkedItems[node.id] = true;
      return isChecked;
    }

    if (node.children && node.children.length > 0) {
      const results = node.children.map(checkNode);
      const allChecked = results.every(Boolean);

      if (allChecked) {
        checkedItems[node.id] = true;
      }

      return allChecked;
    }

    return false;
  };

  items.forEach(checkNode);

  const toggleItem = (item: TreeMenuItem) => {
    const newSelected = { ...selectedItems };

    const isChecked = !!checkedItems[item.id];

    const toggleChildren = (node: TreeMenuItem, shouldCheck: boolean) => {
      if (node.type === "emp" && node.employee) {
        if (shouldCheck) {
          newSelected[node.id] = node.employee;
        } else {
          delete newSelected[node.id];
        }
      }

      node.children?.forEach((child) => toggleChildren(child, shouldCheck));
    };

    toggleChildren(item, !isChecked);

    handleRecipients(newSelected);
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className="tree-view-container"
      role="tree"
      aria-labelledby={ariaLabelledby}
    >
      <MenuList
        list={items}
        checkedItems={checkedItems}
        onToggle={toggleItem}
      />
    </div>
  );
};

export default TreeView;
