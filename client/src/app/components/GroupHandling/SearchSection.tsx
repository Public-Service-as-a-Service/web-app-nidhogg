"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useSearchEmployees } from "@/app/services/useSearchEmployees";
import { Button, Input } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import SearchPagination from "./SearchPagination";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";

interface SearchSectionProps {
  memberIds: string[];
  handleBulkMembers: (recipientIds: Employee[]) => void;
}

const SearchSection = ({
  memberIds,
  handleBulkMembers,
}: SearchSectionProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const t = useTranslations("GroupHandling");

  const {
    mutate: searchEmployees,
    data: result,
    isPending,
    error,
  } = useSearchEmployees();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchEmployees({
          query: searchTerm,
          page: page,
        });
      }
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, searchEmployees]);

  useEffect(() => {
    setCheckedIds((prev) => prev.filter((id) => !memberIds.includes(id)));
  }, [memberIds]);

  const handleCheckedChange = (memberId: string, isChecked: boolean) => {
    setCheckedIds((prev) =>
      isChecked
        ? Array.from(new Set([...prev, memberId]))
        : prev.filter((id) => id !== memberId),
    );
  };

  const handleAddSelected = () => {
    if (checkedIds.length === 0) return;
    const selectedMembers =
      result?.content.filter((employee) => checkedIds.includes(employee.id)) ??
      [];
    handleBulkMembers(selectedMembers);
    setCheckedIds([]);
    setSearchTerm("");
  };

  const renderResults = () => {
    if (!result?.content || result.content.length === 0) {
      return (
        <div>
          <p className="text-label-large">{t("errors.noResultsTitle")}</p>
          <p>{t("errors.noResultsMessage")}</p>
        </div>
      );
    }

    return result.content.map((employee) => (
      <MemberCard
        key={employee.id}
        member={employee}
        editMode={true}
        checked={checkedIds.includes(employee.id)}
        onCheckedChange={handleCheckedChange}
        disabled={memberIds.includes(employee.id)}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-12">
      <Input
        className="w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("searchPlaceholder")}
        value={searchTerm}
      />
      {searchTerm && (
        <div className="flex flex-col gap-12">
          {isPending && <Loading />}
          {error && (
            <div>
              <p className="text-label-large">{t("errors.errorTitle")}</p>
              <p>{t("errors.errorMessage")}</p>
            </div>
          )}
          {!isPending && renderResults()}
          <div className="flex flex-row place-content-end">
            <Button
              variant="primary"
              disabled={checkedIds.length === 0}
              onClick={handleAddSelected}
            >
              {t("addSelectedButton")}
            </Button>
          </div>
          <SearchPagination
            page={page}
            totalPages={result?.totalPages ?? 0}
            onPreviousPage={() => setPage(page - 1)}
            onNextPage={() => setPage(page + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchSection;
