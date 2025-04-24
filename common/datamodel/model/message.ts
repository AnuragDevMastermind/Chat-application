export type Message = {
  msg: string;
  conversationId: String;
  timestamp: Date;
  senderId: String;
};

export type MessageRequest = Message & {
  receiverId: string;
};

export type MessageResponse = Message & {
  _id: string;
};
