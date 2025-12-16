"use client";

import { useScreenWidth } from "@/app/hooks/useScreenWidth";
import { tailwindBreakPoint } from "@/app/constants";
import { Button, Chip, Checkbox } from "@sk-web-gui/react";
import MessageForm from "./MessageForm";

interface Props {
  onPrev?: () => void;
}

const MessageStep = ({ onPrev }: Props) => {
  const width = useScreenWidth();
  const isMobile = width < tailwindBreakPoint.MD;

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
    <div className="py-44">
      <p className="text-center">Meddelande</p>
      <div className="py-14">
        <p>Valda mottagare:</p>
        <div className="flex gap-8">
          {recipients.map((item) => (
            <Chip key={item.title}>{item.title}</Chip>
          ))}
        </div>
        <div className="py-14">
          <p>Utskickskanal:</p>
          <div className="flex flex-row gap-8">
            <Checkbox>Microsoft Teams</Checkbox>
            <Checkbox>SMS</Checkbox>
          </div>
        </div>
        <MessageForm />
      </div>
      {isMobile && <Button onClick={onPrev}>Gå tillbaka</Button>}
    </div>
  );
};

export default MessageStep;
