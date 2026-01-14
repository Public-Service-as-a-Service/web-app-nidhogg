"use client";

import { FormControl, FormLabel, Input, Textarea } from "@sk-web-gui/react";

interface Props {
  title?: string;
  messageBody?: string;
  setTitle?: (value: string) => void;
  setMessageBody?: (value: string) => void;
}

const MessageForm = ({ title = "", messageBody = "", setTitle, setMessageBody }: Props) => {
  return (
    <form className="pt-14 flex flex-col gap-14" onSubmit={(e) => e.preventDefault()}>
      <FormControl className="w-full">
        <FormLabel htmlFor="title">Rubrik</FormLabel>
        <Input
          id="title"
          placeholder="Ange rubrik"
          value={title}
          onChange={(e) => setTitle && setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl className="w-full">
        <FormLabel htmlFor="message">Meddelande</FormLabel>
        <Textarea
          id="message"
          placeholder="Ange meddelandets innehåll"
          className="w-full min-h-[150px]"
          value={messageBody}
          onChange={(e) => setMessageBody && setMessageBody(e.target.value)}
        />
      </FormControl>
    </form>
  );
};

export default MessageForm;
