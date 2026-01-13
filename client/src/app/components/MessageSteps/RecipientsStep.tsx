"use client";

import { Button } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckboxCard from "./CheckboxCard";
import GroupSection from "./GroupSection";

interface Props {
  onNext?: () => void;
}

const RecipientsStep = ({ onNext }: Props) => {
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
  };

  const router = useRouter();

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">Välj mottagare</p>
      <div className="flex flex-col gap-14 pb-28">
        <div className="flex flex-col md:flex-row gap-8">
          <CheckboxCard
            label="Alla chefer"
            description="Skicka till samtliga chefer"
          />
          <CheckboxCard
            label="Alla medarbetare"
            description="Skicka till samtliga medarbetare"
            handleAllChecked={handleAllChecked}
          />
        </div>
        <GroupSection allChecked={allChecked} />
      </div>
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={handleGoBack}>
          Gå tillbaka
        </Button>
        <Button onClick={onNext}>Gå vidare</Button>
      </div>
    </div>
  );
};

export default RecipientsStep;
