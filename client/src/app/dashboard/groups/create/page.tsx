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
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [memberById, setMemberById] = useState<Record<string, Employee>>({});

  const t = useTranslations("GroupHandling");

  const handleBulkMembers = (members: Employee[]) => {
    setMemberById((prev) => {
      const next = { ...prev };
      members.forEach((member) => {
        next[member.id] = member;
      });
      return next;
    });
    setMemberIds((prev) => {
      const next = new Set(prev);
      members.forEach((member) => next.add(member.id));
      return Array.from(next);
    });
  };

  const selectedMembers = memberIds
    .map((id) => memberById[id])
    .filter((member): member is Employee => Boolean(member));

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
          memberIds={memberIds}
          handleBulkMembers={handleBulkMembers}
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
