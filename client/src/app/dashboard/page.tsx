"use client";

import MainWrapper from "../components/MainWrapper";
import { useTranslations } from "next-intl";
import TreeView from "../components/TreeView/TreeView";

const Dashboard = () => {
  const t = useTranslations("Dashboard");

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      <TreeView itemsDescription="Valda mottagare:" />
    </MainWrapper>
  );
};

export default Dashboard;
