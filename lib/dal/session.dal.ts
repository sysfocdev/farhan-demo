import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { SessionPayload, UserRole } from "../types";
import { config } from "../utils/env-config";
import { cookies } from "next/headers";
import User from "@/models/user.model";
import { connectToDatabase } from "../db/db";

const secretKey = config.jwtSecretKey;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Date.now())
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (typeof session !== "string" || !session) return;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    const res = payload as { userId: string; role: string };
    return res;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function createSession(userId: string, role: UserRole) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export const getUserIdnRoleIfAuthenticated = async () => {
  console.log("Entering in getuserauthenticated function");
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) return;

  const session = await decrypt(sessionToken);

  if (!session?.userId) {
    return;
  }
  await connectToDatabase();
  const user = await User.findOne({ _id: session.userId });

  if (user) {
    return {
      role: session.role,
      userId: session.userId,
    };
  } else {
    return;
  }
};

export async function deleteSession() {
  (await cookies()).delete("session");
}
