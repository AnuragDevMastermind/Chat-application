import { Request, Response } from "express";

import {
  getUserByNumber,
  createUser,
} from "../db/repositories/user.respository";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../helpers/auth.helper";
import { UserResponse } from "@repo/datamodel/user";

export const login = async (req: Request, res: Response) => {
  try {
    const { number, password } = req.body;

    if (!number || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByNumber(number).select("+password");
    if (!user) {
      console.log("user not found");
      return res.sendStatus(400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.sendStatus(403);
    }

    const userResponse: UserResponse = {
      _id: user.id,
      number: user.number,
      name: user.name,
    };
    const { accessToken } = await generateToken(userResponse);

    res.cookie("Authorization", `Bearer ${accessToken}`, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "strict",
      secure: true,
      path: "/",
      httpOnly: true,
    });

    return res.status(200).json({ accessToken: accessToken }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, number, password } = req.body;
    if (!name || !number || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByNumber(number);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const newUser = await createUser({
      name,
      number,
      password: password,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Failed to create user" }).end();
    }

    return res.status(200).json({ message: "SUCCESS" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("Authorization", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
