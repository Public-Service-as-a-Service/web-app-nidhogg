import React, { useMemo } from "react";
import MenuList from "./MenuList";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { CheckedItem } from "@/app/interfaces/checked-item";
import { useTreeMenu } from "@/app/hooks/useTreeMenu";
import Loading from "../LoadingSpinner";

interface TreeViewProps {
  "aria-labelledby"?: string;
  handleRecipients: (names: string[]) => void;
  selectedNames: string[];
}

const TreeView = ({
  "aria-labelledby": ariaLabelledby,
  handleRecipients,
  selectedNames,
}: TreeViewProps) => {
  const { items, isLoading } = useTreeMenu();

  const allNodesMap = useMemo(() => {
    const map: Record<string, TreeMenuItem> = {};

    const flatten = (nodes: TreeMenuItem[]) => {
      nodes.forEach((node) => {
        map[node.id] = node;
        if (node.children) flatten(node.children);
      });
    };

    flatten(items);
    return map;
  }, [items]);

  const checkedItems = useMemo(() => {
    const map: Record<string, CheckedItem> = {};

    Object.values(allNodesMap).forEach((node) => {
      if (node.type === "emp" && selectedNames.includes(node.name)) {
        map[node.id] = {
          id: node.id,
          name: node.name,
          type: node.type,
          checked: true,
        };
      }
    });

    const updateParents = (node: TreeMenuItem) => {
      if (!node.children || node.children.length === 0) return;

      node.children.forEach(updateParents);

      const allChildrenChecked = node.children.every((child) => map[child.id]);

      if (allChildrenChecked) {
        map[node.id] = {
          id: node.id,
          name: node.name,
          type: node.type,
          checked: true,
        };
      }
    };

    items.forEach(updateParents);

    return map;
  }, [selectedNames, allNodesMap, items]);

  const toggleItem = (item: TreeMenuItem) => {
    const newSelected = new Set(selectedNames);
    const isCurrentlyChecked = !!checkedItems[item.id];

    const toggleDescendants = (node: TreeMenuItem, shouldCheck: boolean) => {
      if (node.type === "emp") {
        if (shouldCheck) {
          newSelected.add(node.name);
        } else {
          newSelected.delete(node.name);
        }
      }

      node.children?.forEach((child) => toggleDescendants(child, shouldCheck));
    };

    toggleDescendants(item, !isCurrentlyChecked);

    handleRecipients(Array.from(newSelected));
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
