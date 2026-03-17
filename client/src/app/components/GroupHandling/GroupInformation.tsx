"use client";

import { Input, Textarea } from "@sk-web-gui/react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

interface GroupInformationProps {
  isEditing: boolean;
  title: string;
  description: string;
  createdAt: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const GroupInformation = ({
  isEditing,
  title,
  description,
  createdAt,
  titlePlaceholder,
  descriptionPlaceholder,
  onTitleChange,
  onDescriptionChange,
}: GroupInformationProps) => {
  const t = useTranslations("GroupHandling");

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-10">
        {!isEditing ? (
          <h1 className="text-h2-sm !m-0">{title}</h1>
        ) : (
          <div>
            <p className="text-label-large">{t("groupNameLabel")}</p>
            <Input
              placeholder={titlePlaceholder}
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full"
            />
          </div>
        )}
        <p className="text-small">
          {t("wasCreated")}
          {dayjs(createdAt).format("YYYY-MM-DD")}
        </p>
      </div>
      <div className="flex flex-col">
        {!isEditing ? (
          <div>
            <p className="text-label-large !m-0">{t("groupDescription")}</p>
            <p>{description}</p>
          </div>
        ) : (
          <div className="w-full">
            <p className="text-label-large !m-0">{t("groupDescription")}</p>
            <Textarea
              placeholder={descriptionPlaceholder}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupInformation;
