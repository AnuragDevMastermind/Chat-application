import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { UserResponse } from "@repo/datamodel/user";
import  ms from "ms";
const JWT_SECRET = process.env.JWT_SECRET || "secret_password";

// export const generateToken = async (user: User) => {
//   return {
//     accessToken: await generateTokenWithExpiration(user, "1d"),
//     refreshToken: await generateTokenWithExpiration(user, "30d")
//   };
// };

export const generateToken = async (userResponse: UserResponse) => {
  return {
    accessToken: await generateTokenWithExpiration(userResponse, ms("1d")),
  };
};

const generateTokenWithExpiration = async (
  userResponse: UserResponse,
  expiresIn: number
) => {
  try {
    return jwt.sign(userResponse, JWT_SECRET, {
      expiresIn: expiresIn,
    });
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to generate token with expiration ${expiresIn}`);
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

export const getUserFromToken = (token: string): UserResponse => {
  const { _id, number, name } = jwtDecode<UserResponse>(token);
  return { _id, number, name } as UserResponse;
};
