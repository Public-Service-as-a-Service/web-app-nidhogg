"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";
import { ProgressStepper } from "@sk-web-gui/react";

const Messages = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");

  const t_steps = useTranslations("ProgressSteps");

  const steps = [
    {
      label: t_steps("recipients"),
      content: <RecipientsStep onNext={() => setStep(1)} />,
    },
    {
      label: t_steps("message"),
      content: (
        <MessageStep
          onNext={() => setStep(2)}
          onPrev={() => setStep(0)}
          title={title}
          messageBody={messageBody}
          setTitle={setTitle}
          setMessageBody={setMessageBody}
        />
      ),
    },
    {
      label: t_steps("view"),
      content: (
        <ViewStep
          onPrev={() => setStep(1)}
          title={title}
          messageBody={messageBody}
        />
      ),
    },
  ];

  return (
    <MainWrapper>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[600px]">
        <ProgressStepper
          steps={steps.map((s) => s.label)}
          labelPosition="bottom"
          current={step}
          size="sm"
          className="pb-40"
        />
        {steps[step].content}
      </div>
    </MainWrapper>
  );
};

export default Messages;
