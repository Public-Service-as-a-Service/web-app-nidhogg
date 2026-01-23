"use client";

import { Card, Checkbox } from "@sk-web-gui/react";

interface CheckboxCardProps {
  allChecked: boolean;
  handleAllChecked?: (isChecked: boolean) => void;
  label: string;
  description: string;
  handleRecipients?: (name: string) => void;
  recipients?: string[];
  disabled?: boolean;
}

const CheckboxCard = ({
  allChecked,
  handleAllChecked,
  label,
  description,
  handleRecipients,
  recipients,
  disabled,
}: CheckboxCardProps) => {
  const isMasterToggle = !!handleAllChecked;
  const isChecked = isMasterToggle
    ? allChecked
    : recipients?.includes(label) || false;

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.checked;

    if (isMasterToggle) {
      handleAllChecked?.(nextValue);
    } else {
      handleRecipients?.(label);
    }
  };

  return (
    <Card
      className={`flex-auto ${disabled && !isMasterToggle ? "opacity-40" : "opacity-100"}`}
    >
      <Card.Body>
        <Card.Text>
          <div className="text-label-medium">
            <Checkbox
              className="pr-8"
              onChange={handleCheck}
              checked={isChecked}
              disabled={disabled}
            />
            {label}
          </div>
          <p>{description}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CheckboxCard;
