import React from "react";
import MenuList from "./MenuList";
import "./styles.css";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { useTreeMenu } from "@/app/components/TreeView/utils/useTreeMenu";
import Loading from "../LoadingSpinner";
import { Employee } from "@/app/interfaces/employee";
import ErrorHandler from "../ErrorHandler";
import { Button } from "@sk-web-gui/react";
import { ChevronLeft } from "lucide-react";
import { buildCheckedItems, toggleSelection } from "./utils/treeUtils";
import { useTreeNavigation } from "./utils/useTreeNavigation";

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
  const { items, isLoading, error, loadNodeChildren } = useTreeMenu();
  const { currentItems, backLabel, canGoBack, navigateInto, navigateBack } =
    useTreeNavigation(items, loadNodeChildren);

  const checkedItems = buildCheckedItems(items, selectedItems);

  const toggleItem = (item: TreeMenuItem) => {
    handleRecipients(toggleSelection(item, checkedItems, selectedItems));
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <div
      className="tree-view-container"
      role="tree"
      aria-labelledby={ariaLabelledby}
    >
      {canGoBack && (
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
      <MenuList
        list={currentItems}
        checkedItems={checkedItems}
        onToggle={toggleItem}
        onNavigate={navigateInto}
      />
    </div>
  );
};

export default TreeView;
