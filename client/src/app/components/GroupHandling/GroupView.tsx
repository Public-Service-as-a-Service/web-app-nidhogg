"use client";

import GroupCard from "./GroupCard";
import { useTranslations } from "next-intl";
import { Group } from "@/app/interfaces/group";
import { Button } from "@sk-web-gui/react";

interface GroupCardProps {
  list: Group[];
}

const GroupView = ({ list = [] }: GroupCardProps) => {
  const t = useTranslations("GroupHandling");

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">{t("sectionTitle")}</p>
      <div className="flex flex-col gap-14 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item) => (
            <GroupCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary">{t("goBackButton")}</Button>
        <Button>{t("addButton")}</Button>
      </div>
    </div>
  );
};

export default GroupView;
