"use client";

import { MessageRecipient } from "../interfaces/message";
import { X, Check } from "lucide-react";


interface RecipientListProps {
  recipient?: MessageRecipient;
}

const RecipientItem = ({ recipient }: RecipientListProps) => {
  const deliveryStatus = recipient?.deliveryStatus;
  const deliveryStatusIcon = deliveryStatus === "DELIVERED" ? <Check/>
             : <X/>;

  return (
    <div className="py-8 flex flex-col">
      <div className="flex items-center">
        <div className="p-12">
          {deliveryStatusIcon}
        </div>
        <p>{recipient?.firstName} {recipient?.lastName}, {recipient?.orgName} </p>
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default RecipientItem;
