export interface MessageRecipient {
  employeeId: number;
  firstName: string;
  lastName: string;
  orgId: string;
  workTitle: string;
  deliveryStatus: string;
}

export interface Message {
  id: number;
  title: string;
  content: string | null;
  sender: string;
  messageType: string;
  createdAt: string;
  recipients: MessageRecipient[];
}
