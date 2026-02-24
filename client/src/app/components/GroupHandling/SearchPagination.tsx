import { Button } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchPaginationProps {
  page: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const SearchPagination = ({
  page,
  totalPages,
  onPreviousPage,
  onNextPage,
}: SearchPaginationProps) => {
  const t = useTranslations("GroupHandling");

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex flex-row place-content-between">
      <Button
        iconButton={true}
        disabled={page === 0}
        onClick={onPreviousPage}
      >
        <ArrowLeft />
      </Button>
      <p className="self-center">
        {t("pagination", {
          current: page + 1,
          total: totalPages,
        })}
      </p>
      <Button
        iconButton={true}
        disabled={page + 1 === totalPages}
        onClick={onNextPage}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default SearchPagination;
