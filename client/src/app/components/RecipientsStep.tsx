"use client";

import React from "react";
import { useScreenWidth } from "@/app/hooks/useScreenWidth";
import { tailwindBreakPoint } from "@/app/constants";
import { Button } from "@sk-web-gui/react";
import { UserStar, Users, List, LucideProps } from "lucide-react";

interface Props {
  onNext?: () => void;
}

const RecipientsStep = ({ onNext }: Props) => {
  const width = useScreenWidth();
  const isMobile = width < tailwindBreakPoint.MD;

  const buttons: {
    title: string;
    description: string;
    icon: React.ComponentType<LucideProps>;
  }[] = [
    {
      title: "Alla chefer",
      description: "Skicka till samtliga chefer",
      icon: UserStar,
    },
    {
      title: "Alla medarbetare",
      description: "Skicka till samtliga medarbetare",
      icon: Users,
    },
    {
      title: "Grupper",
      description: "Välj en eller flera grupper",
      icon: List,
    },
  ];

  return (
    <div className="pt-44">
      <p className="text-center">Mottagare</p>
      <div className="flex flex-col md:flex-row gap-18 md:gap-24 py-14">
        {buttons.map((button) => {
          const Icon = button.icon;
          return (
            <div key={button.title} className="flex flex-col gap-4">
              <Button variant="secondary">
                <Icon />
                {button.title}
              </Button>
              <p className="text-small">{button.description}</p>
            </div>
          );
        })}
      </div>
      {isMobile && <Button onClick={onNext}>Gå vidare</Button>}
    </div>
  );
};

export default RecipientsStep;
