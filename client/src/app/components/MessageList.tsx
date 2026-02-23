"use client";

import { Button, Card } from "@sk-web-gui/react";
import { useMessages } from "../services/useMessages";
import { useTranslations } from "next-intl";
import Loading from "./LoadingSpinner";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";

const MessageList = () => {
  const t = useTranslations("Dashboard");
  const router = useRouter();

  const { data: messages = [], isLoading } = useMessages();

  const handleNewMessage = () => {
    router.push("/dashboard/messages");
  };

  const handleClick = (id: string) => {
    router.push(`/dashboard/messages/${id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-40">
      <div className="flex justify-end">
        <Button size="lg" onClick={handleNewMessage}>
          {t("newMessageButton")}
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-h2-sm !m-0">{t("sentMessagesHeading")}</h1>
        <p className="text-large">{t("sentMessagesInfo")}</p>
      </div>
      <div className="flex flex-col gap-16 w-full">
        {messages.map((item) => (
          <Card key={item.id}>
            <Card.Body className="w-full pt-24">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col justify-center">
                  <h2 className="text-h3-sm !mt-0">{item.title}</h2>
                  <p className="text-small">
                    {dayjs(item.createdAt).format("YYYY-MM-DD, HH:MM")}
                  </p>
                </div>
                <Button
                  iconButton
                  rounded
                  size="md"
                  onClick={() => handleClick(item.id)}
                >
                  <ArrowRight />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
