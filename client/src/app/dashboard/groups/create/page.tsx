"use client";

import MainWrapper from "@/app/components/MainWrapper";
import { JSX, useState } from "react";
import { ProgressStepper } from "@sk-web-gui/react";
import InfoStep from "@/app/components/CreateGroupSteps/InfoStep";
import MembersStep from "@/app/components/CreateGroupSteps/MembersStep";
import { useTranslations } from "next-intl";

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const CreateGroup = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const t = useTranslations("GroupHandling");

  const steps: StepsProps[] = [
    {
      label: t("steps.groupInfo"),
      content: (
        <InfoStep
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onNext={() => setStep(1)}
        />
      ),
    },
    {
      label: t("steps.groupMembers"),
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
