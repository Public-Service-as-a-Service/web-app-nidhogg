"use client";

import { Button } from "@sk-web-gui/react";

interface Props {
  onPrev?: () => void;
  onNext?: () => void;
}

const ViewStep = ({ onPrev, onNext }: Props) => {
  return (
    <div className="py-44 px-20">
      <p className="text-center text-xl">Välj mottagare</p>
      <div className="flex place-content-between">
        <Button variant="tertiary" onClick={onPrev}>
          Gå tillbaka
        </Button>
        <Button onClick={onNext}>Gå vidare</Button>
      </div>
    </div>
  );
};

export default ViewStep;
