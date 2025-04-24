import { UserModel } from "../../models/user.model";

export const getUsers = () => UserModel.find();
export const getUserByNumber = (number: string) =>
  UserModel.findOne({ number });
export const getUserById = (id: string) => UserModel.findOne({ id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
