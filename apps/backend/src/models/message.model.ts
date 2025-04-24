import mongoose, { Schema, Document, Types } from "mongoose";
import { Message } from "@repo/datamodel/message";
import { updateConversationById } from "../db/repositories/conversation.repository";

interface MessageDocument extends Document, Message {}

const messageSchema: Schema<MessageDocument> = new Schema<MessageDocument>(
  {
    msg: { type: String, required: true },
    conversationId: { type: Types.ObjectId, required: true },
    timestamp: { type: Date, required: true },
    senderId: { type: Types.ObjectId, required: true },
  },
  { versionKey: false }
);

messageSchema.pre("save", async function (next) {
  try {
    const message = this as MessageDocument;
    
    await updateConversationById(message.conversationId, {
      lastMessage: message.msg,
      lastMessageTime: message.timestamp.getTime(),
    });

    next();
  } catch (error) {
    next(error);
  }

});

export const MessageModel = mongoose.model<MessageDocument>(
  "Message",
  messageSchema
);
