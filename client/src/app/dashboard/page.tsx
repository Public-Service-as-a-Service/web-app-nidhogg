"use client";

import MainWrapper from "../components/MainWrapper";
import { useTranslations } from "next-intl";

const Dashboard = () => {
  const t = useTranslations("Dashboard");

  return (
    <MainWrapper title={t("title")}>
      <div>
        <p color="text.primary">{t("welcomeMessage")}</p>
      </div>
    </MainWrapper>
  );
};

export default Dashboard;
