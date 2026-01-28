"use client";

import GroupCard from "./GroupCard";
import { useTranslations } from "next-intl";
import { Group } from "@/app/interfaces/group";

interface GroupCardProps {
  list: Group[];
}

const GroupView = ({ list = [] }: GroupCardProps) => {
  const t = useTranslations("GroupHandling");

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl"> {t("sectionTitle")} </p>
      {list.map((item) => (
        <GroupCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GroupView;
