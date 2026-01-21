"use client";

import { FormControl, FormLabel, Input, Textarea } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";

interface MessageFormProps {
  title?: string;
  messageBody?: string;
  setTitle?: (value: string) => void;
  setMessageBody?: (value: string) => void;
}

const MessageForm = ({
  title = "",
  messageBody = "",
  setTitle,
  setMessageBody,
}: MessageFormProps) => {
  const t = useTranslations("MessageForm");

  return (
    <form
      className="pt-14 flex flex-col gap-14"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormControl className="w-full">
        <FormLabel htmlFor="title">{t("titleLabel")}</FormLabel>
        <Input
          id="title"
          placeholder={t("titlePlaceholder")}
          value={title}
          onChange={(e) => setTitle && setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl className="w-full">
        <FormLabel htmlFor="message">{t("messageLabel")}</FormLabel>
        <Textarea
          id="message"
          placeholder={t("messagePlaceholder")}
          className="w-full min-h-[150px]"
          value={messageBody}
          onChange={(e) => setMessageBody && setMessageBody(e.target.value)}
        />
      </FormControl>
    </form>
  );
};

export default MessageForm;
