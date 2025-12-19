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
        <Button size="lg">{t("newMessageButton")}</Button>
      </div>
      <MessageList />
    </MainWrapper>
  );
};

export default Dashboard;
