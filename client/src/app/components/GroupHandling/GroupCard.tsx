"use client";

import { Card, Button } from "@sk-web-gui/react";
import { Group } from "@/app/interfaces/group";
import { SquarePen } from "lucide-react";

interface GroupCardProps {
  item: Group;
}

const GroupCard = ({ item }: GroupCardProps) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Header className="text-label-large">{item.name}</Card.Header>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
        <div className="flex flex-row place-content-end pb-12 pr-12">
          <Button iconButton={true} size="md">
            <SquarePen />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GroupCard;
