"use client";

import { Button } from "@sk-web-gui/react";
import { ArrowLeft, Users } from "lucide-react";
import SearchSection from "../GroupHandling/SearchSection";

interface MemberStepProps {
  onPrev: () => void;
}

const MembersStep = ({ onPrev }: MemberStepProps) => {
  return (
    <div className="flex flex-col gap-40">
      <h1 className="text-h3-md !m-0">2. Lägg till medlemmar</h1>
      <div className="flex flex-col gap-8">
        <p className="text-label-large">Sök efter medarbetare</p>
        <SearchSection />
      </div>
      <div className="flex flex-row place-content-between">
        <Button variant="secondary" onClick={onPrev}>
          <ArrowLeft />
          Tillbaka
        </Button>
        <Button>
          Skapa grupp <Users />
        </Button>
      </div>
    </div>
  );
};

export default MembersStep;
