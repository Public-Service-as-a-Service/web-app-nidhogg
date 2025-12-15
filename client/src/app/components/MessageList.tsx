"use client";

import { Button, Card } from "@sk-web-gui/react";
import { useMessages } from "../services/useMessages";
import { useTranslations } from "next-intl";
import Loading from "./LoadingSpinner";

const MessageList = () => {
  const t = useTranslations("Dashboard");
  const { data: messages = [], isLoading } = useMessages();

  if (isLoading) return <Loading />;

  return (
    <div className="px-20">
      <h2 className="py-12 text-center">{t("sentMessages")}</h2>
      <div className="flex flex-col gap-10 max-w-[700px]">
        {messages.map((item) => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Header>
                <div className="flex flex-col md:flex-row justify-between">
                  <h3>{item.title}</h3>
                  <p>{new Date(item.createDate).toLocaleString()}</p>
                </div>
              </Card.Header>
              <Card.Text>
                <p>{item.content}</p>
              </Card.Text>
              <div className="pt-24 flex justify-center">
                <Button size="sm" variant="primary">
                  {t("updateMessageButton")}
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
