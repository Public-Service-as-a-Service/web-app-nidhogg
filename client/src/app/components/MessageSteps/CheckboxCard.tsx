"use client";

import { Card, Checkbox } from "@sk-web-gui/react";

interface Props {
  handleAllChecked?: () => void;
  label: string;
  description: string;
}

const CheckboxCard = ({ handleAllChecked, label, description }: Props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          <div className="text-label-medium">
            <Checkbox className="pr-8" onChange={handleAllChecked} />
            {label}
          </div>
          <p>{description}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CheckboxCard;
