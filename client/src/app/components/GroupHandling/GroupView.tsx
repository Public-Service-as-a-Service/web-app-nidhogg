"use client";

import GroupCard from "./GroupCard";
import { useTranslations } from "next-intl";
import { Group } from "@/app/interfaces/group";
import { Button } from "@sk-web-gui/react";
import { UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShowAllToggleButton from "../ShowAllToggleButton";

interface GroupCardProps {
  list: Group[];
}

const GroupView = ({ list = [] }: GroupCardProps) => {
  const [amount, setAmount] = useState<number>(3);
  const t = useTranslations("GroupHandling");
  const router = useRouter();

  const handleCreate = () => {
    router.push("/dashboard/groups/create");
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
          {list.slice(0, amount).map((item) => (
            <GroupCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <ShowAllToggleButton
        totalCount={list.length}
        visibleCount={amount}
        collapsedCount={3}
        onToggle={setAmount}
        showAllText={t("showAllButton")}
        goBackText={t("goBackButton")}
      />
    </div>
  );
};

export default GroupView;
