"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { ReactElement, useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";

const Messages = () => {
  const t = useTranslations("Dashboard");

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [title, setTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");

  const steps: Record<0 | 1 | 2, ReactElement> = {
    0: <RecipientsStep onNext={() => setStep(1)} />,
    1: (
      <MessageStep
        onNext={() => setStep(2)}
        onPrev={() => setStep(0)}
        title={title}
        messageBody={messageBody}
        setTitle={setTitle}
        setMessageBody={setMessageBody}
      />
    ),
    2: (
      <ViewStep
        onPrev={() => setStep(1)}
        title={title}
        messageBody={messageBody}
      />
    ),
  };

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[600px]">
        {steps[step]}
      </div>
    </MainWrapper>
  );
};

export default Messages;
