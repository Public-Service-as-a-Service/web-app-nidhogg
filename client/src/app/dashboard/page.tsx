"use client";

import MainWrapper from "../components/MainWrapper";
import MessageList from "../components/MessageList";
import { useTranslations } from "next-intl";
import { Button } from "@sk-web-gui/react";

const Dashboard = () => {
  const t = useTranslations("Dashboard");

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      <div className="py-30">
        <Button size="lg">Skapa nytt utskick</Button>
      </div>
      <MessageList />
    </MainWrapper>
  );
};

export default Dashboard;
