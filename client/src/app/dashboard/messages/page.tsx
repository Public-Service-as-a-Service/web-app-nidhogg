"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { JSX, useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";
import { ProgressStepper } from "@sk-web-gui/react";
import { Employee } from "@/app/interfaces/employee";

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const Messages = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [recipientGroups, setRecipientGroups] = useState<string[]>([]);
  const [recipientsById, setRecipientsById] = useState<
    Record<string, Employee>
  >({});
  const [channels, setChannels] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const handleAllCheckedChange = (checked: boolean) => {
    setAllChecked(checked);
    if (checked) {
      setRecipientGroups([]);
      setRecipientsById({});
    }
  };

  const toggleItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleGroupRecipients = (recipient: string) => {
    if (allChecked) return;
    setRecipientGroups((prev) => toggleItem(prev, recipient));
  };

  const handleEmployeeRecipients = (
    nextRecipients: Record<string, Employee>,
  ) => {
    if (allChecked) return;
    setRecipientsById(nextRecipients);
  };

  const handleChannels = (channel: string) => {
    setChannels((prev) => toggleItem(prev, channel));
  };

  const t_steps = useTranslations("ProgressSteps");

  const steps: StepsProps[] = [
    {
      label: t_steps("recipients"),
      content: (
        <RecipientsStep
          onNext={() => setStep(1)}
          recipientGroups={recipientGroups}
          recipientsById={recipientsById}
          handleGroupRecipients={handleGroupRecipients}
          handleEmployeeRecipients={handleEmployeeRecipients}
          allChecked={allChecked}
          setAllChecked={handleAllCheckedChange}
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
          recipientGroups={recipientGroups}
          recipientsById={recipientsById}
          allChecked={allChecked}
          channels={channels}
          handleChannels={handleChannels}
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
          recipientGroups={recipientGroups}
          recipientsById={recipientsById}
          allChecked={allChecked}
          channels={channels}
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
