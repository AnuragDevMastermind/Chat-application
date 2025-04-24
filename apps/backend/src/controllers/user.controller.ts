import { Request, Response } from "express";

import { getUsers } from "../db/repositories/user.respository";
import { getUserFromToken, verifyToken } from "../helpers/auth.helper";

export const getLoggedInUser = async (req: Request, res: Response) => {
  const authorization = req.cookies.Authorization;

  if (!authorization) {
    return res.status(200).json({ user: null });
  }

  const accessToken = authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(200).json({ user: null });
  }

  const isValidToken = verifyToken(accessToken);
  if (!isValidToken) {
    return res.status(200).json({ user: null });
  }

  const userResponse = getUserFromToken(accessToken);

  return res.status(200).json({
    user: userResponse,
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
