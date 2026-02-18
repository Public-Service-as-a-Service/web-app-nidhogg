"use client";

import { Button, Input, Textarea } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface InfoStepProps {
  onNext: () => void;
}

const InfoStep = ({ onNext }: InfoStepProps) => {
  return (
    <div className="flex flex-col gap-40">
      <h1 className="text-h3-md !m-0">1. Ange information</h1>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">Gruppnamn</p>
        <Input placeholder="Ange gruppnamn" />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">Beskrivning</p>
        <Textarea
          placeholder="Ange en beskrivning av gruppen"
          className="w-full min-h-[150px]"
        />
      </div>
      <div className="flex flex-row place-content-between">
        <Button variant="secondary">
          <ArrowLeft />
          Tillbaka
        </Button>
        <Button onClick={onNext}>
          Nästa
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default InfoStep;
