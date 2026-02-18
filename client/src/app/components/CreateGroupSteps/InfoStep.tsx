"use client";

import { Button, Input, Textarea } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface InfoStepProps {
  title?: string;
  description?: string;
  setTitle?: (value: string) => void;
  setDescription?: (value: string) => void;
  onNext: () => void;
}

const InfoStep = ({
  title = "",
  description = "",
  setTitle,
  setDescription,
  onNext,
}: InfoStepProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-40">
      <h1 className="text-h3-md !m-0">1. Ange information</h1>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">Gruppnamn</p>
        <Input
          placeholder="Ange gruppnamn"
          value={title}
          onChange={(e) => setTitle && setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">Beskrivning</p>
        <Textarea
          placeholder="Ange en beskrivning av gruppen"
          className="w-full min-h-[150px]"
          value={description}
          onChange={(e) => setDescription && setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-row place-content-between">
        <Button
          variant="secondary"
          onClick={() => router.push("/dashboard/groups")}
        >
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
