"use client";

import GroupCard from "./GroupCard";
import { useTranslations } from "next-intl";
import { Group } from "@/app/interfaces/group";
import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";

interface GroupCardProps {
  list: Group[];
}

const GroupView = ({ list = [] }: GroupCardProps) => {
  const t = useTranslations("GroupHandling");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center sm:text-xl md:text-2xl">
        {t("sectionTitle")}
      </h1>
      <div className="flex flex-col gap-14 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item) => (
            <GroupCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={handleGoBack}>
          {t("goBackButton")}
        </Button>
        <Button>{t("addGroupButton")}</Button>
      </div>
    </div>
  );
};

export default GroupView;
