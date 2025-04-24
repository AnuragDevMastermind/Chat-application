import { Request, Response } from "express";
import { getPaginatedMessages } from "../db/repositories/message.repository";
import { getConversation } from "../db/repositories/conversation.repository";

export const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { page, size } = req.query;

  try {
    const messages = await getPaginatedMessages(conversationId, +page, +size);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessagsUsingIds = async (req: Request, res: Response) => {
  const { userId, friendId, page, size } = req.query;

  try {
    const conversation = await getConversation(
      userId.toString(),
      friendId.toString()
    );
    if (conversation) {
      const messages = await getPaginatedMessages(
        conversation._id,
        +page,
        +size
      );
      res.json(messages);
    } else res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
