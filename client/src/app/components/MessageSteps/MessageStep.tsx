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
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">Skriv meddelande</p>
      <div className="flex flex-col gap-8 pb-28">
        <div>
          <p className="sk-form-label sk-form-label-md mb-8 mt-0">
            Valda mottagare
          </p>
          <div className="flex flex-wrap gap-8">
            {recipients.map((item) => (
              <Chip key={item.title}>{item.title}</Chip>
            ))}
          </div>
          <MessageForm />
        </div>
        <div className="flex flex-col md:flex-row gap-14">
          <Card>
            <Card.Body>
              <Card.Text>
                <div className="text-label-medium">
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
                <div className="text-label-medium">
                  <Checkbox className="pr-8" />
                  SMS
                </div>
                <p>Skicka meddelande via SMS</p>
              </Card.Text>
            </Card.Body>
          </Card>
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
