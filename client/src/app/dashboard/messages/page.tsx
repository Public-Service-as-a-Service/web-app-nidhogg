"use client";

import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { JSX, useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";
import { ProgressStepper } from "@sk-web-gui/react";

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const Messages = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const handleAllCheckedChange = (checked: boolean) => {
    setAllChecked(checked);
    if (checked) {
      setRecipients([]);
    }
  };

  const toggleItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleRecipients = (recipient: string) => {
    if (allChecked) return;
    setRecipients((prev) => toggleItem(prev, recipient));
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
          recipients={recipients}
          handleRecipients={handleRecipients}
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
          recipients={recipients}
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
          recipients={recipients}
          allChecked={allChecked}
          channels={channels}
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
