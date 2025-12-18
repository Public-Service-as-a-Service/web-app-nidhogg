"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RecipientsStep from "@/app/components/RecipientsStep";
import MessageStep from "@/app/components/MessageStep";
// import { useScreenWidth } from "@/app/hooks/useScreenWidth";
// import { tailwindBreakPoint } from "@/app/constants";

const Messages = () => {
  const t = useTranslations("Dashboard");

  const [step, setStep] = useState<"recipients" | "message">("recipients");

  // const width = useScreenWidth();
  // const isMobile = width < tailwindBreakPoint.MD;

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      {step === "recipients" ? (
        <RecipientsStep onNext={() => setStep("message")} />
      ) : (
        <MessageStep onPrev={() => setStep("recipients")} />
      )}
    </MainWrapper>
  );
};

export default Messages;
