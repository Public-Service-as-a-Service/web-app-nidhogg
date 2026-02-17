"use client";

import { MessageRecipient } from "../interfaces/message";
import RecipientItem from "./RecipientItem";

interface RecipientListProps {
  recipients?: MessageRecipient[];
}

const RecipientList = ({ recipients = [] }: RecipientListProps) => {
  return (
    <div>
      {recipients.map((recipient) => (
        <RecipientItem key={recipient.employeeId} recipient={recipient} />
      ))}
    </div>
  );
};

export default RecipientList;
