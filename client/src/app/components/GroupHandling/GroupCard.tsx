"use client";

import { Card, Button } from "@sk-web-gui/react";
import { Group } from "@/app/interfaces/group";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface GroupCardProps {
  item: Group;
}

const GroupCard = ({ item }: GroupCardProps) => {
  const t = useTranslations("GroupHandling");
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/groups/${item.id}`);
  };

  return (
    <Card>
      <Card.Body className="w-full">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col flex-1">
            <Card.Header>
              <h2 className="text-h3-sm">{item.name}</h2>
            </Card.Header>
            <Card.Text>
              <p className="text-sm">
                {t("wasCreated")}
                {new Date(item.createDate).toLocaleDateString()}
              </p>
            </Card.Text>
          </div>
          <div className="flex items-center">
            <Button
              iconButton={true}
              rounded={true}
              size="md"
              onClick={handleClick}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GroupCard;
