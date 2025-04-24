import { jwtDecode } from "jwt-decode";
import { UserResponse } from "@repo/datamodel/user";

export const getUserFromToken = (token: string): UserResponse => {
  const { _id, number, name } = jwtDecode<UserResponse>(token);
  return { _id, number, name } as UserResponse;
};
