import "server-only";

import User from "@/models/user.model";
import { connectToDatabase } from "../db/db";
import { cache } from "react";
import { UserCredentialDTO } from "../dto/user.dto";
import { UserRole } from "../types";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_verified: boolean;
}

export const insertUserToDB = async (
  name: string,
  email: string,
  hashedPassword: string
): Promise<UserType | null> => {
  await connectToDatabase();
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return null;

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      is_verified: newUser.is_verified,
    };
  } catch (error) {
    console.error("Error in insertUserToDB:", error);
    return null;
  }
};

export const getUserCredentialsByEmail = cache(
  async (email: string): Promise<UserCredentialDTO | null> => {
    try {
      await connectToDatabase();
      const user = await User.findOne({ email }).select("-__v, +password");
      return user;
    } catch (error) {
      console.error("Error in getUserCredentialsByEmail:", error);
      return null;
    }
  }
);

export const isUserVerified = async (email: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });

    return user?.is_verified;
  } catch (error) {
    console.error("Error checking user verification:", error);
    return false;
  }
};

export async function setLoginDate(userId: string) {
  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(
      { _id: userId },
      { lastLogin: new Date() },
      { new: true }
    );
  } catch (error) {
    console.error("Error setting login date:", error);
  }
}

export async function getUser(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findById({ _id: userId }).select("-__v");
    return user;
  } catch (error) {
    console.error("Error getting user", error);
  }
}
