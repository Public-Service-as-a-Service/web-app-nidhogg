"use client";

import GroupCard from "./GroupCard";
import { useTranslations } from "next-intl";
import { Group } from "@/app/interfaces/group";
import { Button } from "@sk-web-gui/react";
import { UsersRound, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/app/constants";

interface GroupCardProps {
  list: Group[];
}

const GroupView = ({ list = [] }: GroupCardProps) => {
  const t = useTranslations("GroupHandling");
  const router = useRouter();

  const handleCreate = () => {
    router.push(PAGE_ROUTES.dashboardGroupCreate);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end pb-64">
        <Button size="lg" onClick={handleCreate}>
          {t("createGroupButton")}
          <UsersRound />
        </Button>
      </div>
      <h1 className="text-h2-sm">{t("sectionTitle")}</h1>
      <div className="flex flex-col gap-14 pb-16">
        <div className="flex flex-col gap-24">
          {list.map((item) => (
            <GroupCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="secondary" rounded={true}>
          {t("showAllButton")}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default GroupView;
