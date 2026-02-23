"use client";

import { MessageRecipient } from "../interfaces/message";

interface RecipientListProps {
  recipient?: MessageRecipient;
}

const RecipientItem = ({ recipient }: RecipientListProps) => {
  return (
    <div className="py-8 flex flex-row">
      <p>
        {recipient?.firstName} {recipient?.lastName}
      </p>
      <p className="pl-16">{recipient?.workTitle}</p>
      <hr />
    </div>
  );
};

export default RecipientItem;
