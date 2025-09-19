import "server-only";
import { UserRole } from "../types";

export type UserProfileDTO = {
  name: string | null;
  email: string | null;
  phone: string | undefined;
  role: UserRole;
  profileImg: string | undefined;
};

export type UserCredentialDTO = {
  id: string;
  email: string;
  password: string | null;
  role: UserRole;
  profileImg: string | null;
};

export type UserIDandRoleForSessionDTO = {
  id: string;
  role: UserRole;
};
