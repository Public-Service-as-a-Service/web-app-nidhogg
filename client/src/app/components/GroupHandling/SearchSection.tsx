"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useSearchEmployees } from "@/app/services/useSearchEmployees";
import { Button, Input } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);

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
      <MemberCard key={employee.id} member={employee} editMode={true} />
    ));
  };

  if (isPending) return <Loading />;

  return (
    <div className="w-full">
      <Input
        className="w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("searchPlaceholder")}
      />
      <div className="flex flex-col gap-12 pb-28 pt-20">
        {error && (
          <div>
            <p className="text-label-large">{t("errors.errorTitle")}</p>
            <p>{t("errors.errorMessage")}</p>
          </div>
        )}
        {renderResults()}
        {(result?.totalPages ?? 0) > 0 && (
          <div className="flex flex-row place-content-between">
            <Button
              iconButton={true}
              disabled={page === 0 && true}
              onClick={() => setPage(page - 1)}
            >
              <ArrowLeft />
            </Button>
            <p className="self-center">
              {t("pagination", {
                current: page + 1,
                total: result?.totalPages ?? 0,
              })}
            </p>
            <Button
              iconButton={true}
              disabled={page + 1 === result?.totalPages && true}
              onClick={() => setPage(page + 1)}
            >
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
