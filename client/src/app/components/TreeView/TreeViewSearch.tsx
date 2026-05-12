"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { useSearchOrganizations } from "@/app/services/useSearchOrganizations";
import Loading from "../LoadingSpinner";
import MenuList from "./MenuList";

interface TreeViewSearchProps {
  checkedItems: Record<string, boolean>;
  onToggle: (item: TreeMenuItem) => Promise<void> | void;
  onSearchActiveChange: (active: boolean) => void;
}

const TreeViewSearch = ({
  checkedItems,
  onToggle,
  onSearchActiveChange,
}: TreeViewSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const t = useTranslations("RecipientsStep");

  const {
    mutate: searchOrganizations,
    data: result,
    isPending,
    error,
    reset: resetSearch,
  } = useSearchOrganizations();

  useEffect(() => {
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      resetSearch();
      onSearchActiveChange(false);
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    const timeout = setTimeout(() => {
      setIsDebouncing(false);
      onSearchActiveChange(true);
      searchOrganizations({ query: trimmed, size: 30 });
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm, resetSearch, searchOrganizations, onSearchActiveChange]);

  const searchItems = useMemo(
    () =>
      (result?.content ?? []).map((organization) => ({
        id: `org-${organization.orgId}`,
        name: organization.name,
        type: "org" as const,
        treeLevel: organization.treeLevel,
        parentId: organization.parentOrgId
          ? `org-${organization.parentOrgId}`
          : null,
        children: [],
        childrenLoaded: false,
        childrenLoading: false,
        childrenError: null,
      })),
    [result],
  );

  const renderResults = () => {
    if (!searchTerm || isPending || !result) return null;

    if (searchItems.length === 0) {
      return <p className="pt-8 text-small">{t("searchNoResults")}</p>;
    }

    return (
      <MenuList
        list={searchItems}
        checkedItems={checkedItems}
        onToggle={onToggle}
        onNavigate={() => undefined}
        isSearchActive={true}
      />
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-8">
        <Input
          className="w-full mb-8"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
        />
        {searchTerm && (
          <Button variant="secondary" onClick={() => setSearchTerm("")}>
            {t("searchClear")}
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-12 pt-12">
        {searchTerm && !isDebouncing && (
          <>
            {isPending && <Loading />}
            {error && <p className="pt-8 text-small">{t("searchError")}</p>}
            {!isPending && !error && renderResults()}
          </>
        )}
      </div>
    </div>
  );
};

export default TreeViewSearch;
