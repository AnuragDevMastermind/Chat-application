import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "@repo/datamodel/user";

interface UserDocument extends Document, User {}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>(
  {
    number: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export const UserModel = mongoose.model("User", userSchema);
