"use client";

import MainWrapper from "../components/MainWrapper";
import { useTranslations } from "next-intl";
import TreeView from "../components/TreeView/TreeView";

const Dashboard = () => {
  const t = useTranslations("Dashboard");

  return (
    <MainWrapper title={t("title")}>
      <div>
        <p color="text.primary">{t("welcomeMessage")}</p>
      </div>
      <TreeView itemsDescription="Valda mottagare:" />
    </MainWrapper>
  );
};

export default Dashboard;
