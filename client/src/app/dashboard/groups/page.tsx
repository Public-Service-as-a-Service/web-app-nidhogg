"use client";

import MainWrapper from "@/app/components/MainWrapper";
import { useTranslations } from "next-intl";

const Groups = () => {
  const t = useTranslations("Dashboard");

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[600px]">
        <p>Grupper</p>
      </div>
    </MainWrapper>
  );
};

export default Groups;
