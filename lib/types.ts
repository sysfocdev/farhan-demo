export type UserRole = "user" | "admin";

export type UserType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  profileImg?: string;
  role: UserRole;
  is_verified: boolean;
};

export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  role: UserRole;
  expiresAt: Date;
};
