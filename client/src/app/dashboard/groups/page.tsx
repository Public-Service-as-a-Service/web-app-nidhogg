"use client";

import MainWrapper from "@/app/components/MainWrapper";
import GroupView from "@/app/components/GroupHandling/GroupView";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import { useGroups } from "@/app/services/useGroups";

const Groups = () => {
  const t = useTranslations("Dashboard");
  const { data: groups = [], isLoading } = useGroups();

  if (isLoading) return <Loading />;

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[600px]">
        <GroupView list={groups} />
      </div>
    </MainWrapper>
  );
};

export default Groups;
