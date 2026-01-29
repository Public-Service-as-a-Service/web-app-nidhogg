"use client";

import { Card, Button } from "@sk-web-gui/react";
import { Group } from "@/app/interfaces/group";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

interface GroupCardProps {
  item: Group;
}

const GroupCard = ({ item }: GroupCardProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/dashboard/groups/${item.id}`);
  };

  return (
    <Card className="w-full">
      <Card.Body>
        <Card.Header className="text-label-large">{item.name}</Card.Header>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
      <div className="flex flex-row place-content-end pb-12 pr-12">
        <Button iconButton={true} size="md" onClick={handleEdit}>
          <SquarePen />
        </Button>
      </div>
    </Card>
  );
};

export default GroupCard;
