export interface MessageRecipient {
  employeeId: number;
  firstName: string;
  lastName: string;
  orgId: string;
  workTitle: string;
  deliveryStatus: string;
  receivedAt: string;
}

export interface Message {
  id: string;
  title: string;
  content: string | null;
  sender: string;
  createdAt: string;
  recipients: MessageRecipient[];
}
