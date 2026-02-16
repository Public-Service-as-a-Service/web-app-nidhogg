"use client";

import { MessageRecipient } from "../interfaces/message";

interface RecipientListProps {
  recipient?: MessageRecipient;
}

const RecipientItem = ({ recipient }: RecipientListProps) => {
  return (
    <div className="py-8">
      <p>{recipient?.workTitle}</p>
      <hr />
    </div>
  );
};

export default RecipientItem;
