"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";
// import { useScreenWidth } from "@/app/hooks/useScreenWidth";
// import { tailwindBreakPoint } from "@/app/constants";

const Messages = () => {
  const t = useTranslations("Dashboard");

  const [step, setStep] = useState(0);

  // const width = useScreenWidth();
  // const isMobile = width < tailwindBreakPoint.MD;

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      {step === 0 ? (
        <RecipientsStep onNext={() => setStep(step + 1)} />
      ) : step === 1 ? (
        <MessageStep
          onNext={() => setStep(step + 1)}
          onPrev={() => setStep(step - 1)}
        />
      ) : (
        <ViewStep onPrev={() => setStep(step - 1)} />
      )}
    </MainWrapper>
  );
};

export default Messages;
