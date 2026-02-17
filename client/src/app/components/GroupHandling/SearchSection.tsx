"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useSearchEmployees } from "@/app/services/useSearchEmployees";
import { Button, Input } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const t = useTranslations("GroupHandling");

  const {
    mutate: searchEmployees,
    data: result,
    isPending,
  } = useSearchEmployees();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchEmployees({
          query: searchTerm,
          page: page,
        });
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, searchEmployees]);

  if (isPending) return <Loading />;

  return (
    <div className="w-full">
      <Input
        className="w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-12 pb-28 pt-20">
        {result?.content.length === 0 ? (
          <p>{t("noResults")}</p>
        ) : (
          result?.content.map((employee) => (
            <MemberCard key={employee.id} member={employee} editMode={true} />
          ))
        )}
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
              {t("page")} {page + 1}
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

export default Groups;
