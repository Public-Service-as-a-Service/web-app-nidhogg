"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";

const Messages = () => {
  const t = useTranslations("Dashboard");

  const [step, setStep] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");

  return (
    <MainWrapper title={t("title")} subtitle={t("subtitle")}>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[600px]">
        {step === 0 ? (
          <RecipientsStep onNext={() => setStep(step + 1)} />
        ) : step === 1 ? (
          <MessageStep
            onNext={() => setStep(step + 1)}
            onPrev={() => setStep(step - 1)}
            title={title}
            messageBody={messageBody}
            setTitle={setTitle}
            setMessageBody={setMessageBody}
          />
        ) : (
          <ViewStep
            onPrev={() => setStep(step - 1)}
            title={title}
            messageBody={messageBody}
          />
        )}
      </div>
    </MainWrapper>
  );
};

export default Messages;
