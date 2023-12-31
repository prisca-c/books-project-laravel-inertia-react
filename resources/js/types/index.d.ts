export interface User {
  id: number;
  username: string;
  role_id: number;
  email: string;
  email_verified_at: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  errors: {
    [key: string]: string[];
  };
};
