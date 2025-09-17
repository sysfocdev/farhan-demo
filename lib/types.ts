export type UserRole = "user" | "admin";

export type UserType = {
  name: string;
  phone: string;
  email: string;
  profileImg: string;
  role: UserRole;
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
