"use client";

import { Button, Label } from "@sk-web-gui/react";

interface Props {
  onPrev?: () => void;
}

const ViewStep = ({ onPrev }: Props) => {
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
    <div className="py-44 px-20 max-w-[450px]">
      <p className="text-center text-xl">Granska meddelande</p>
      <div className="pt-14 pb-28">
        <p>Valda mottagare</p>
        <div className="flex flex-wrap gap-8">
          {recipients.map((item) => (
            <Label key={item.title}>{item.title}</Label>
          ))}
        </div>
        <div>
          <p className="text-label-large pt-14">Rubrik</p>
          <p>Kris på kris</p>
          <p className="text-label-large pt-8">Meddelande</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure
            doloremque facilis corrupti voluptates obcaecati nulla officiis sint
            dolorum accusamus. Iste, odit aut? Sit voluptatibus dicta maxime est
            quia doloribus dolor dolores quod ab tenetur adipisci officia,
            exercitationem in sed asperiores?
          </p>
        </div>
      </div>
      <div className="flex place-content-between">
        <Button variant="tertiary" onClick={onPrev}>
          Gå tillbaka
        </Button>
        <Button>Skicka meddelande</Button>
      </div>
    </div>
  );
};

export default ViewStep;
