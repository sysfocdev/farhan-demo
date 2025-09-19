"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { SignupFormSchema } from "@/lib/schemas/SignupFormSchema";
import { LoginFormSchema } from "@/lib/schemas/LoginFormSchema";

import { LoginFormState, SignUpFormState } from "@/lib/types";
import {
  getUser,
  getUserCredentialsByEmail,
  insertUserToDB,
  isUserVerified,
  setLoginDate,
} from "@/lib/dal/user.dal";
import {
  createSession,
  deleteSession,
  getUserIdnRoleIfAuthenticated,
} from "@/lib/dal/session.dal";

export async function signup(state: SignUpFormState, formData: FormData) {
  console.log("Signup function");
  const validateFields = SignupFormSchema.safeParse({
    name: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await insertUserToDB(name, email, hashedPassword);

  if (!user) {
    return {
      message: "Email already used. Login or Reset Password from Login Page",
    };
  }

  await createSession(user.id, user.role);
  redirect(`/admin/dashboard`);
}

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserCredentialsByEmail(email);

  // change it later password must be checked in schema
  if (!user || !user.password)
    return { success: false, message: "Email or Password is incorrect." };

  const isVerified = await isUserVerified(user.email);

  // if (!isVerified) return { success: false, message: "Email is not verified." };

  const isPasswordMatched = await bcrypt.compare(password, user.password!);

  if (!isPasswordMatched)
    return { success: false, message: "Email or password is incorrect" };

  await setLoginDate(user.id);
  await createSession(user.id, user.role);

  return redirect("/admin/dashboard");
}

export async function getCurrentlyAuthenticatedUser() {
  const session = await getUserIdnRoleIfAuthenticated();
  if (!session) return;

  const user = await getUser(session.userId);
  if (!user) {
    await deleteSession();
    redirect("/login");
  }
  return user;
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
