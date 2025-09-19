import "server-only";

import User, { UserRole } from "@/models/user.model";
// import { MongoClient, ObjectId } from "mongodb";
import { ObjectId } from "mongodb";
import { getUserIdnRoleIfAuthenticated } from "./session.dal";
import { connectToDatabase } from "../db/db";
import { UserType } from "../types";

export const getAllUsersFromDB = async (
  page: number,
  limit: number
): Promise<{ users: UserType[]; total: number; error?: string }> => {
  //   const client = new MongoClient(process.env.MONGO_URI!);
  //   const db = client.db("your_database_name");
  //   const usersCollection = db.collection("users");

  try {
    const skip = (page - 1) * limit;
    const user = await getUserIdnRoleIfAuthenticated();
    if (user?.role !== UserRole.ADMIN) {
      return { error: "Unauthorized", users: [], total: 0 };
    }
    await connectToDatabase();

    const [users, total] = await Promise.all([
      // User.find({ _id: { $ne: new ObjectId(user?.userId) } })
      User.find()

        .select("id:_id profileImg name email  role is_verified ")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      User.countDocuments(),
    ]);

    return { users, total };
  } catch (error) {
    console.error("Error in getAllUsersFromDB:", error);
    throw new Error("Failed to fetch users");
  }
};

export const changeUserVerificationStatusFromDB = async (
  userId: string,
  status: boolean
) => {
  try {
    await connectToDatabase();
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { is_verified: status } },
      { new: true }
    );
  } catch (error) {
    console.error("Error in changeUserVerificationStatusFromDB:", error);
  }
};

export const deleteUserFromDB = async (userId: string) => {
  try {
    const user = await getUserIdnRoleIfAuthenticated();

    if (user?.role !== UserRole.ADMIN) {
      // return { error: "Unauthorized", users: [], total: 0 };
    }
    await connectToDatabase();
    const deleteRes = await User.findOneAndDelete({ _id: userId });
    return deleteRes;
  } catch (error) {
    console.error("Error in deleteUserFromDB:", error);
  }
};
