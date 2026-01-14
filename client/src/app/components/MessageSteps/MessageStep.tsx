"use client";

import { Button, Chip } from "@sk-web-gui/react";
import MessageForm from "./MessageForm";
import CheckboxCard from "./CheckboxCard";

interface Props {
  onPrev?: () => void;
  onNext?: () => void;
  title?: string;
  messageBody?: string;
  setTitle?: (value: string) => void;
  setMessageBody?: (value: string) => void;
}

const MessageStep = ({ onPrev, onNext, title, messageBody, setTitle, setMessageBody }: Props) => {
  const recipients = [
    {
      title: "Alla chefer",
    },
    {
      title: "Krisgruppen",
    },
    {
      title: "IT-jouren",
    },
  ];

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">Skriv meddelande</p>
      <div className="flex flex-col gap-8 pb-28">
        <div>
          <p className="text-label-medium mb-8 mt-0">Valda mottagare</p>
          <div className="flex flex-wrap gap-8">
            {recipients.map((item) => (
              <Chip key={item.title}>{item.title}</Chip>
            ))}
          </div>
          <MessageForm
            title={title}
            messageBody={messageBody}
            setTitle={setTitle}
            setMessageBody={setMessageBody}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label="Microsoft Teams"
            description="Skicka meddelande via Teams"
          />
          <CheckboxCard label="SMS" description="Skicka meddelande via SMS" />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={onPrev} className="self-start">
          Gå tillbaka
        </Button>
        <Button variant="primary" onClick={onNext} className="self-start">
          Granska
        </Button>
      </div>
    </div>
  );
};

export default MessageStep;
