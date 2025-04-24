import { UserResponse } from "./user";

export type Conversation = {
  userIds: string[];
  lastMessage: string;
  lastMessageTime: number;
};

export type ConversationResponse = {
  _id: string;
  lastMessage: string;
  lastMessageTime: string;
  friend: UserResponse;
};
