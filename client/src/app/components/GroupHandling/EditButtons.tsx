"use client";

import { Button } from "@sk-web-gui/react";
import { SquarePen, Save, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface EditButtonsProps {
  isEditing: boolean;
  isPending: boolean;
  onDelete: () => void;
  onEditMode: () => void;
  onSave: () => void;
  disabled: boolean;
}

const EditButtons = ({
  isEditing,
  isPending,
  onDelete,
  onEditMode,
  onSave,
  disabled,
}: EditButtonsProps) => {
  const t = useTranslations("GroupHandling");

  return (
    <div className="flex justify-between pb-40">
      <Button variant="secondary" onClick={onDelete}>
        {t("deleteButton")}
        <Trash2 />
      </Button>
      {!isEditing ? (
        <Button onClick={onEditMode}>
          {t("editButton")}
          <SquarePen />
        </Button>
      ) : (
        <Button onClick={onSave} disabled={isPending || disabled}>
          {t("saveButton")}
          <Save />
        </Button>
      )}
    </div>
  );
};

export default EditButtons;
