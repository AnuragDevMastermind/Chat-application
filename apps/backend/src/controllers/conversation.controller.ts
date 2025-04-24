import { Request, Response } from "express";

import { getConversations } from "../db/repositories/conversation.repository";
import { getUserFromToken } from "../helpers/auth.helper";

export const getAllConversations = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.Authorization.split(" ")[1];
    const userResponse = getUserFromToken(accessToken);
    console.log(userResponse);
    const conversation = await getConversations(userResponse._id);
    return res.status(200).json(conversation);
  } catch (error) {
    return res.sendStatus(400);
  }
};
