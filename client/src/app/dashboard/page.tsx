"use client";

import MainWrapper from "../components/MainWrapper";
import MessageList from "../components/MessageList";
import { useTranslations } from "next-intl";
import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const t = useTranslations("Dashboard");
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/dashboard/messages");
  };

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      <div className="py-30">
        <Button size="lg" onClick={handleNavigation}>
          {t("newMessageButton")}
        </Button>
      </div>
      <MessageList />
    </MainWrapper>
  );
};

export default Dashboard;
