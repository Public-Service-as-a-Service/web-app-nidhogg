"use client";

import { MessageRecipient } from "../interfaces/message";

interface RecipientListProps {
  recipient?: MessageRecipient;
}

const RecipientItem = ({ recipient }: RecipientListProps) => {
  return (
    <div className="py-8 flex flex-col">
      <div className="flex flex-row place-content-between">
        <p>
          {recipient?.firstName} {recipient?.lastName}
        </p>
        <p>{recipient?.workTitle}</p>
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default RecipientItem;
