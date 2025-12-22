"use client";

import { FormControl, FormLabel, Input, Textarea } from "@sk-web-gui/react";

const MessageForm = () => {
  return (
    <FormControl className="w-full pt-14">
      <FormLabel>Nytt meddelande</FormLabel>
      <Input placeholder="Ange rubrik" />
      <Textarea placeholder="Ange meddelandets innehåll" className="w-full min-h-[150px]" />
    </FormControl>
  );
};

export default MessageForm;
