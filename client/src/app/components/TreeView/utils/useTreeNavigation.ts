import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { findNode } from "./treeUtils";

type NavLevel = (string | null)[];

export function useTreeNavigation(
  items: TreeMenuItem[],
  loadNodeChildren: (node: TreeMenuItem) => Promise<TreeMenuItem>,
) {
  const [navLevel, setNavLevel] = useState<NavLevel>([null]);
  const t = useTranslations("RecipientsStep");

  const currentNodeId = navLevel[navLevel.length - 1];
  const currentNode =
    currentNodeId !== null ? findNode(items, currentNodeId) : null;
  const currentItems =
    currentNodeId !== null ? (currentNode?.children ?? []) : items;

  const parentNodeId =
    navLevel.length >= 2 ? navLevel[navLevel.length - 2] : undefined;
  const parentNode =
    parentNodeId != null ? findNode(items, parentNodeId) : null;
  const backLabel = parentNode?.name ?? t("goBackButton");

  const navigateInto = useCallback(
    async (item: TreeMenuItem) => {
      if (item.type !== "org") return;

      let target = item;
      let foundBranch = false;

      while (!foundBranch) {
        const loaded = await loadNodeChildren(target).catch(() => undefined);
        if (!loaded?.children?.length) return;

        const onlyChild =
          loaded.children.length === 1 ? loaded.children[0] : null;
        if (onlyChild?.type === "org" && onlyChild.name === target.name) {
          target = onlyChild;
        } else {
          foundBranch = true;
        }
      }

      setNavLevel((prev) => [...prev, target.id]);
    },
    [loadNodeChildren],
  );

  const navigateBack = useCallback(() => {
    setNavLevel((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  return {
    currentItems,
    backLabel,
    canGoBack: navLevel.length > 1,
    navigateInto,
    navigateBack,
  };
}
