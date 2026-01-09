"use client";

import { FormControl, FormLabel, Input, Textarea } from "@sk-web-gui/react";

const MessageForm = () => {
  return (
    <form className="pt-14 flex flex-col gap-14">
      <FormControl className="w-full">
        <FormLabel htmlFor="title">Rubrik</FormLabel>
        <Input id="title" placeholder="Ange rubrik" />
      </FormControl>
      <FormControl className="w-full">
        <FormLabel htmlFor="message">Meddelande</FormLabel>
        <Textarea
          id="message"
          placeholder="Ange meddelandets innehåll"
          className="w-full min-h-[150px]"
        />
      </FormControl>
    </form>
  );
};

export default MessageForm;
