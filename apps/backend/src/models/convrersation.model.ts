import mongoose, { Schema, Document } from "mongoose";
import { Conversation } from "@repo/datamodel/conversation";

interface ConversationDocument extends Document, Conversation {}

const conversationSchema: Schema<ConversationDocument> =
  new Schema<ConversationDocument>(
    {
      userIds: { type: [String], required: true },
      lastMessage: { type: String, required: true },
      lastMessageTime: { type: Number, required: true },
    },
    { versionKey: false }
  );

export const ConversationModel = mongoose.model(
  "Conversation",
  conversationSchema
);
