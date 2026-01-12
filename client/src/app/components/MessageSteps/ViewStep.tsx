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
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">Granska meddelande</p>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col">
          <p className="text-label-medium">Rubrik</p>
          <p>Kris på kris</p>
        </div>
        <div className="flex flex-col">
          <p className="text-label-medium">Meddelande</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure
            doloremque facilis corrupti voluptates obcaecati nulla officiis sint
            dolorum accusamus. Iste, odit aut? Sit voluptatibus dicta maxime est
            quia doloribus dolor dolores quod ab tenetur adipisci officia,
            exercitationem in sed asperiores?
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-label-medium">Valda mottagare</p>
          <div className="flex flex-wrap gap-8 my-4">
            {recipients.map((item) => (
              <Label key={item.title}>{item.title}</Label>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-label-medium">Utskickskanaler</p>
          <p>Mottagare notifieras via Teams</p>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={onPrev}>
          Gå tillbaka
        </Button>
        <Button>Skicka</Button>
      </div>
    </div>
  );
};

export default ViewStep;
