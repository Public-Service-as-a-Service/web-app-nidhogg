import React from "react";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { List, Button, Checkbox } from "@sk-web-gui/react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface MenuItemProps {
  item: TreeMenuItem;
  isChecked: boolean;
  onToggle: (item: TreeMenuItem) => void;
  onNavigate: (item: TreeMenuItem) => Promise<void> | void;
}

const MenuItem = ({ item, isChecked, onToggle, onNavigate }: MenuItemProps) => {
  const t = useTranslations("RecipientsStep");
  const canNavigate = item.type === "org";

  return (
    <List.Item className="pt-0 [li&::before]:!hidden [&::before]:!hidden [&::before]:!content-none">
      <List.Text
        className={canNavigate ? "menu-item parent-item" : "menu-item"}
      >
        <span className="menu-item-left">
          <Checkbox
            onClick={() => onToggle(item)}
            checked={isChecked}
            tabIndex={0}
            role="checkbox"
            aria-checked={isChecked}
            disabled={item.childrenLoading}
          />
        </span>

        <span className="menu-item-center px-5 text-h4-sm">{item.name}</span>

        {canNavigate && (
          <Button
            iconButton={true}
            variant="ghost"
            size="sm"
            onClick={() => {
              void onNavigate(item);
            }}
            tabIndex={0}
            aria-label={t("navigateInto", { org: item.name })}
            className="menu-item-right"
            disabled={item.childrenLoading}
          >
            <ChevronRight />
          </Button>
        )}
      </List.Text>
    </List.Item>
  );
};

export default MenuItem;
