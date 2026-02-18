"use client";

import MainWrapper from "@/app/components/MainWrapper";
import { JSX, useState } from "react";
import { ProgressStepper } from "@sk-web-gui/react";
import InfoStep from "@/app/components/CreateGroupSteps/InfoStep";
import MembersStep from "@/app/components/CreateGroupSteps/MembersStep";

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const CreateGroup = () => {
  const [step, setStep] = useState(0);

  const steps: StepsProps[] = [
    {
      label: "Information",
      content: <InfoStep onNext={() => setStep(1)} />,
    },
    {
      label: "Medlemmar",
      content: <MembersStep onPrev={() => setStep(0)} />,
    },
  ];

  return (
    <MainWrapper>
      <ProgressStepper
        steps={steps.map((s) => s.label)}
        labelPosition="bottom"
        current={step}
        size="sm"
        className="pb-40"
      />
      {steps[step].content}
    </MainWrapper>
  );
};

export default CreateGroup;
