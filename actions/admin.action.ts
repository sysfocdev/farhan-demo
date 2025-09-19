"use server";
import {
  changeUserVerificationStatusFromDB,
  deleteUserFromDB,
  getAllUsersFromDB,
} from "@/lib/dal/admin.dal";
import { revalidatePath } from "next/cache";

export const getAllUser = async (page: number, limit: number) => {
  return await getAllUsersFromDB(page, limit);
};

export const changeUserVerificationStatus = async (
  userStatus: boolean,
  userId: string
) => {
  if (!userId) return;

  await changeUserVerificationStatusFromDB(userId, userStatus);

  revalidatePath(`/admin/manage-users`);
  return {};
};

export const deleteUser = async (userId: string) => {
  if (!userId) return;

  const res = await deleteUserFromDB(userId);
  if (!res) return;

  revalidatePath(`/admin/manage-users`);
  return {};
};
