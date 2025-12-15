"use client";

import { Button, Card } from "@sk-web-gui/react";

const MessageList = () => {
  const messages = [
    {
      id: 1,
      createDate: "2025-12-12 12:24",
      title: "Kris 1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, cumque! Asperiores ducimus corporis voluptates delectus nemo, ea aliquid aperiam hic!",
    },
    {
      id: 2,
      createDate: "2025-12-12 10:26",
      title: "Kris 2",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, cumque! Asperiores ducimus corporis voluptates delectus nemo, ea aliquid aperiam hic!",
    },
    {
      id: 3,
      createDate: "2025-06-19 08:24",
      title: "Kris 3",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, cumque! Asperiores ducimus corporis voluptates delectus nemo, ea aliquid aperiam hic!",
    },
  ];

  return (
    <div className="px-20">
      <h2 className="py-12 text-center">Dina senaste utskick</h2>
      <div className="flex flex-col gap-10 max-w-[700px]">
        {messages.map((item) => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Header>
                <div className="flex justify-between">
                  <h3>{item.title}</h3>
                  <p>{item.createDate}</p>
                </div>
              </Card.Header>
              <Card.Text>
                <p>{item.content}</p>
              </Card.Text>
              <div className="pt-24 flex justify-center">
                <Button size="sm" variant="primary">
                  Skicka nytt meddelande
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
