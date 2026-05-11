import { Employee } from "@/app/interfaces/employee";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

export const findNode = (
  nodes: TreeMenuItem[],
  id: string,
): TreeMenuItem | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children?.length) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

const collectChecked = (
  node: TreeMenuItem,
  selectedItems: Record<string, Employee>,
  checkedItems: Record<string, boolean>,
): boolean => {
  if (node.type === "emp") {
    const isChecked = !!selectedItems[node.id];
    if (isChecked) checkedItems[node.id] = true;
    return isChecked;
  }

  if (node.children && node.children.length > 0) {
    const results = node.children.map((child) =>
      collectChecked(child, selectedItems, checkedItems),
    );
    const allChecked = results.every(Boolean);
    if (allChecked) checkedItems[node.id] = true;
    return allChecked;
  }

  return false;
};

export const buildCheckedItems = (
  items: TreeMenuItem[],
  selectedItems: Record<string, Employee>,
): Record<string, boolean> => {
  const checkedItems: Record<string, boolean> = {};
  items.forEach((item) => collectChecked(item, selectedItems, checkedItems));
  return checkedItems;
};

export const syncAncestorOrgNodeChecks = (
  items: TreeMenuItem[],
  startParentId: string | null,
  selectedItems: Record<string, Employee>,
  selectedOrgNodes: Record<string, boolean>,
): Record<string, boolean> => {
  const nextOrgNodes = { ...selectedOrgNodes };

  const isFullyChecked = (node: TreeMenuItem): boolean => {
    if (node.type === "emp") return !!selectedItems[node.id];
    if (nextOrgNodes[node.id]) return true;
    if (!node.children?.length) return false;

    return node.children.every((child) => isFullyChecked(child));
  };

  let parentId = startParentId;

  while (parentId) {
    const parent = findNode(items, parentId);
    if (!parent || parent.type !== "org") break;

    const allChildrenChecked =
      !!parent.children?.length &&
      parent.children.every((child) => isFullyChecked(child));

    if (allChildrenChecked) {
      nextOrgNodes[parent.id] = true;
    } else {
      delete nextOrgNodes[parent.id];
    }

    parentId = parent.parentId;
  }

  return nextOrgNodes;
};

export const toggleSelection = (
  item: TreeMenuItem,
  checkedItems: Record<string, boolean>,
  selectedItems: Record<string, Employee>,
): Record<string, Employee> => {
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
  return newSelected;
};
