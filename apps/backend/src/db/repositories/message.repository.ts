import { MessageModel } from "../../models/message.model";

export const createMessage = (values: Record<string, any>) =>
  new MessageModel(values).save().then((message) => message.toObject());

export const getPaginatedMessages = (
  conversationId: string,
  page: number,
  size: number
) =>
  MessageModel.find({ conversationId })
    .sort({ timestamp: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .exec();
