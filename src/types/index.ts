export interface Task {
  id: string;
  title: string;
  dateline: Date | string;
  description: string;
  tags: string[];
  status: boolean;
  type: string;
}

export type UserType = {
  userId: string;
  userName: string;
  email: string;
  status: "online" | "offline";
};

export type MessageType = {
  messageId: string;
  senderId: string;
  content: string;
  timestamp: string;
  replyTo?: string;
};

export type InboxType = {
  id: string;
  groupName: string;
  users: UserType[];
  messages: MessageType[];
};
