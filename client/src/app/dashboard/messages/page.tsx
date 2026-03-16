"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { JSX, useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";
import { ProgressStepper } from "@sk-web-gui/react";
import { Employee } from "@/app/interfaces/employee";

export interface GroupRecipient {
  id: number | string;
  name: string;
  endpoint?: string;
  employees?: Employee[];
  recipientIds?: number[];
}

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const Messages = () => {
  const [step, setStep] = useState(0);

  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [recipientGroups, setRecipientGroups] = useState<
    Record<string, GroupRecipient>
  >({});
  const [recipientEmployees, setRecipientEmployees] = useState<
    Record<string, Employee>
  >({});

  const [title, setTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [channels, setChannels] = useState<string[]>([]);

  const handleAllCheckedChange = (checked: boolean) => {
    setAllChecked(checked);
    if (checked) {
      setRecipientGroups({});
      setRecipientEmployees({});
    }
  };

  const toggleItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleGroupRecipients = (group: GroupRecipient) => {
    if (allChecked) return;
    const key = String(group.id);
    setRecipientGroups((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = group;
      }
      return next;
    });
  };

  const handleEmployeeRecipients = (
    nextRecipients: Record<string, Employee>,
  ) => {
    if (allChecked) return;
    setRecipientEmployees(nextRecipients);
  };

  const handleChannels = (channel: string) => {
    setChannels((prev) => toggleItem(prev, channel));
  };

  const t_steps = useTranslations("ProgressSteps");

  const commonProps = {
    recipientGroups,
    recipientEmployees,
    allChecked,
  };

  const steps: StepsProps[] = [
    {
      label: t_steps("recipients"),
      content: (
        <RecipientsStep
          onNext={() => setStep(1)}
          handleGroupRecipients={handleGroupRecipients}
          handleEmployeeRecipients={handleEmployeeRecipients}
          setAllChecked={handleAllCheckedChange}
          {...commonProps}
        />
      ),
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
          channels={channels}
          handleChannels={handleChannels}
          {...commonProps}
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
          channels={channels}
          {...commonProps}
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

export default Messages;
