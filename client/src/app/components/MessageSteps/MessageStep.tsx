"use client";

import { Button, Chip, Checkbox, Card } from "@sk-web-gui/react";
import MessageForm from "./MessageForm";

interface Props {
  onPrev?: () => void;
  onNext?: () => void;
}

const MessageStep = ({ onPrev, onNext }: Props) => {
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
    <div>
      <p className="text-center text-xl">Skriv meddelande</p>
      <div className="py-14">
        <p>Valda mottagare</p>
        <div className="flex flex-wrap gap-8">
          {recipients.map((item) => (
            <Chip key={item.title}>{item.title}</Chip>
          ))}
        </div>
        <MessageForm />
      </div>

      <div className="flex flex-col md:flex-row gap-14 pb-28">
        <Card>
          <Card.Body>
            <Card.Text>
              <div className="pb-4 text-label-medium">
                <Checkbox className="pr-8" />
                Microsoft Teams
              </div>
              <p>Skicka meddelande via Teams</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text>
              <div className="pb-4 text-label-medium">
                <Checkbox className="pr-8" />
                SMS
              </div>
              <p>Skicka meddelande via SMS</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="flex place-content-between">
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
