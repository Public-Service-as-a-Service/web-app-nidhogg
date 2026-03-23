export interface MessageRecipient {
  employeeId: number;
  firstName: string;
  lastName: string;
  orgId: string;
  orgName?: string;
  workTitle?: string;
  deliveryStatus: string;
  receivedAt?: string;
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
