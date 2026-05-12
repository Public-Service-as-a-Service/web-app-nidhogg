"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@sk-web-gui/react";
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const t = useTranslations("RecipientsStep");

  const {
    mutate: searchOrganizations,
    data: searchResult,
    isPending: isSearching,
    error: searchError,
    reset: resetSearch,
  } = useSearchOrganizations();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      resetSearch();
      onSearchActiveChange(false);
      return;
    }

    onSearchActiveChange(true);
    searchOrganizations({ query: debouncedSearchTerm, size: 30 });
  }, [
    debouncedSearchTerm,
    resetSearch,
    searchOrganizations,
    onSearchActiveChange,
  ]);

  const searchItems = useMemo(
    () =>
      (searchResult?.content ?? []).map((organization) => ({
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
    [searchResult],
  );

  const isSearchActive = debouncedSearchTerm.length > 0;

  return (
    <>
      <Input
        className="w-full mb-8"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("searchPlaceholder")}
        value={searchTerm}
      />
      {isSearchActive && (
        <>
          {isSearching && <Loading />}
          {searchError && <p className="pt-8 text-small">{t("searchError")}</p>}
          {!isSearching && !searchError && searchItems.length === 0 && (
            <p className="pt-8 text-small">{t("searchNoResults")}</p>
          )}
          {!isSearching && !searchError && searchItems.length > 0 && (
            <MenuList
              list={searchItems}
              checkedItems={checkedItems}
              onToggle={onToggle}
              onNavigate={() => undefined}
              isSearchActive={true}
            />
          )}
        </>
      )}
    </>
  );
};

export default TreeViewSearch;
