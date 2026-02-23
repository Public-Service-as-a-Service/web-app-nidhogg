"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useSearchEmployees } from "@/app/services/useSearchEmployees";
import { Button, Input, Modal } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
    setModalOpen(false);
  };

  if (isPending) return <Loading />;

  return (
    <div>
      <Input
        className="w-full"
        placeholder={t("searchPlaceholder")}
        onClick={() => setModalOpen(true)}
      />
      <Modal className="gap-6" show={modalOpen} onClose={() => setModalOpen(false)}>
        <p className="text-label-large">{t("searchLabel")}</p>
        <Input
          className="w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
        />
        <div className="flex flex-col gap-12 pt-20">
          {error && (
            <div>
              <p className="text-label-large">{t("errors.errorTitle")}</p>
              <p>{t("errors.errorMessage")}</p>
            </div>
          )}
          {result?.content.length === 0 ? (
            <div>
              <p className="text-label-large">{t("errors.noResultsTitle")}</p>
              <p>{t("errors.noResultsMessage")}</p>
            </div>
          ) : (
            result?.content.map((employee) => (
              <MemberCard
                key={employee.id}
                member={employee}
                editMode={true}
                checked={checkedIds.includes(employee.id)}
                onCheckedChange={handleCheckedChange}
                disabled={memberIds.includes(employee.id)}
              />
            ))
          )}
          {searchTerm && (
            <div className="flex flex-row place-content-end">
              <Button
                variant="primary"
                disabled={checkedIds.length === 0}
                onClick={handleAddSelected}
              >
                {t("addSelectedButton")}
              </Button>
            </div>
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
      </Modal>
    </div>
  );
};

export default SearchSection;
