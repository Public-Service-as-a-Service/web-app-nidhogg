"use client";

import React from "react";
import { Button, Card, Checkbox } from "@sk-web-gui/react";
import { FormControl, FormLabel, Combobox } from "@sk-web-gui/react";
import { useRouter } from "next/navigation";
// import { useScreenWidth } from "@/app/hooks/useScreenWidth";
// import { tailwindBreakPoint } from "@/app/constants";

interface Props {
  onNext?: () => void;
}

const RecipientsStep = ({ onNext }: Props) => {
  // const width = useScreenWidth();
  // const isMobile = width < tailwindBreakPoint.MD;

  const router = useRouter();

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  const predefinedGroups = [
    { id: 1, name: "Krisgrupp" },
    { id: 2, name: "IT-jour" },
  ];

  const savedGroups = [
    { id: 1, name: "Team Nidhogg" },
    { id: 2, name: "Nidhoggs krishanterare" },
  ];

  return (
    <div className="py-44">
      <p className="text-center text-xl">Välj mottagare</p>
      <div className="flex flex-col md:flex-row gap-14 py-14">
        <Card>
          <Card.Body>
            <Card.Text>
              <div className="pb-4 text-label-medium">
                <Checkbox className="pr-8" />
                Alla chefer
              </div>
              <p>Skicka till samtliga chefer</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text>
              <div className="pb-4 text-label-medium">
                <Checkbox className="pr-8" />
                Alla medarbetare
              </div>
              <p>Skicka till samtliga medarbetare</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="flex flex-col pt-14 pb-28 gap-16">
        <p className="text-label-large">Grupper</p>

        <FormControl className="w-full">
          <FormLabel>Fördefinierade grupper</FormLabel>
          <Combobox multiple placeholder="Välj en eller flera grupper">
            <Combobox.Input className="w-full" />
            <Combobox.List>
              {predefinedGroups.map((group) => (
                <Combobox.Option key={group.id} value={group.name}>
                  {group.name}
                </Combobox.Option>
              ))}
            </Combobox.List>
          </Combobox>
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>Sparade grupper</FormLabel>
          <Combobox multiple placeholder="Välj en eller flera grupper">
            <Combobox.Input className="w-full" />
            <Combobox.List>
              {savedGroups.map((group) => (
                <Combobox.Option key={group.id} value={group.name}>
                  {group.name}
                </Combobox.Option>
              ))}
            </Combobox.List>
          </Combobox>
          <Button variant="secondary" size="sm" className="w-fit">
            Hantera grupper
          </Button>
        </FormControl>
      </div>

      <div className="flex place-content-between">
        <Button variant="tertiary" onClick={handleGoBack}>
          Gå tillbaka
        </Button>
        <Button onClick={onNext}>Gå vidare</Button>
      </div>
    </div>
  );
};

export default RecipientsStep;
