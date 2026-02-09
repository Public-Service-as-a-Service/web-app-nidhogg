"use client";

import { Card, Button } from "@sk-web-gui/react";
import { Group } from "@/app/interfaces/group";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

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
      <Card.Body className="w-full pt-24">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center">
            <h2 className="text-h3-sm !mt-0">{item.name}</h2>
            <p className="text-small">
              {t("wasCreated")}
              {dayjs(item.createdAt).format("YYYY-MM-DD")}
            </p>
          </div>
          <Button iconButton rounded size="md" onClick={handleClick}>
            <ArrowRight />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GroupCard;
