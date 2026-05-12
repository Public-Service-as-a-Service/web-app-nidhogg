import React, { useState } from "react";
import MenuList from "./MenuList";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { useTreeMenu } from "@/app/components/TreeView/utils/useTreeMenu";
import Loading from "../LoadingSpinner";
import { Employee } from "@/app/interfaces/employee";
import ErrorHandler from "../ErrorHandler";
import { Button } from "@sk-web-gui/react";
import { ChevronLeft } from "lucide-react";
import {
  buildCheckedItems,
  syncAncestorOrgNodeChecks,
  toggleSelection,
} from "./utils/treeUtils";
import { useTreeNavigation } from "./utils/useTreeNavigation";
import TreeViewSearch from "./TreeViewSearch";

interface TreeViewProps {
  "aria-labelledby"?: string;
  handleRecipients: (recipients: Record<string, Employee>) => void;
  selectedItems: Record<string, Employee>;
  selectedOrgNodes: Record<string, boolean>;
  handleOrgNodeRecipients: (orgNodes: Record<string, boolean>) => void;
}

const TreeView = ({
  "aria-labelledby": ariaLabelledby,
  handleRecipients,
  selectedItems,
  selectedOrgNodes,
  handleOrgNodeRecipients,
}: TreeViewProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { items, isLoading, error, loadNodeChildren, checkNodeChildren } =
    useTreeMenu();
  const { currentItems, backLabel, canGoBack, navigateInto, navigateBack } =
    useTreeNavigation(items, loadNodeChildren);

  const checkedItems = buildCheckedItems(items, selectedItems);
  const mergedCheckedItems = { ...checkedItems, ...selectedOrgNodes };

  const toggleItem = async (item: TreeMenuItem) => {
    if (item.type === "emp") {
      handleRecipients(toggleSelection(item, checkedItems, selectedItems));
      return;
    }

    const orgId = item.id.replace(/^org-/, "");
    const { orgIds, employees } = await checkNodeChildren(orgId);
    const nextSelected = { ...selectedItems };
    const shouldUncheck = !!mergedCheckedItems[item.id];

    if (shouldUncheck) {
      employees.forEach((employee) => {
        delete nextSelected[`emp-${employee.id}`];
      });
    } else {
      employees.forEach((employee) => {
        nextSelected[`emp-${employee.id}`] = employee;
      });
    }

    const nextOrgNodes = { ...selectedOrgNodes };
    const nodeIds = [item.id, ...orgIds.map((id) => `org-${id}`)];

    nodeIds.forEach((nodeId) => {
      if (shouldUncheck) {
        delete nextOrgNodes[nodeId];
      } else {
        nextOrgNodes[nodeId] = true;
      }
    });

    if (!shouldUncheck && item.parentId) {
      nextOrgNodes[item.parentId] = true;
    }

    const nextOrgNodesWithAncestors = syncAncestorOrgNodeChecks(
      items,
      item.parentId,
      nextSelected,
      nextOrgNodes,
    );

    if (shouldUncheck) {
      delete nextOrgNodesWithAncestors[item.id];
    } else {
      nextOrgNodesWithAncestors[item.id] = true;
    }

    handleOrgNodeRecipients(nextOrgNodesWithAncestors);

    handleRecipients(nextSelected);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <div
      className="tree-view-container"
      role="tree"
      aria-labelledby={ariaLabelledby}
    >
      <TreeViewSearch
        checkedItems={mergedCheckedItems}
        onToggle={toggleItem}
        onSearchActiveChange={setIsSearchActive}
      />
      {canGoBack && !isSearchActive && (
        <Button
          variant="secondary"
          size="sm"
          onClick={navigateBack}
          className="mb-8"
        >
          <ChevronLeft />
          {backLabel}
        </Button>
      )}
      {!isSearchActive && (
        <MenuList
          list={currentItems}
          checkedItems={mergedCheckedItems}
          onToggle={toggleItem}
          isSearchActive={false}
          onNavigate={(item) => {
            void navigateInto(item);
          }}
        />
      )}
    </div>
  );
};

export default TreeView;
