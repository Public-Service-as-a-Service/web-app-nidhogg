"use client";

import MainWrapper from "@/app/components/MainWrapper";
import { JSX, useState } from "react";
import { ProgressStepper } from "@sk-web-gui/react";
import InfoStep from "@/app/components/CreateGroupSteps/InfoStep";
import MembersStep from "@/app/components/CreateGroupSteps/MembersStep";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const CreateGroup = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [membersById, setMembersById] = useState<Record<number, Employee>>({});

  const t = useTranslations("GroupHandling");

  const handleBulkMembers = (members: Employee[]) => {
    setMembersById((prev) => {
      const next = { ...prev };

      for (const member of members) {
        next[member.id] = member;
      }

      return next;
    });
  };

  const handleDeleteMember = (id: number) => {
    setMembersById((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const selectedMembers = Object.values(membersById);

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
      content: (
        <MembersStep
          onPrev={() => setStep(0)}
          members={selectedMembers}
          handleBulkMembers={handleBulkMembers}
          handleDeleteMember={handleDeleteMember}
          title={title}
          description={description}
        />
      ),
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
