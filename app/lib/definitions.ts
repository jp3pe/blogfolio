export type PostType = {
  id: string;
  title: string;
  content?: string | null;
  created_at: Date;
  updated_at: Date;
};

export type UserType = {
  user_id: string;
  email: string;
  username: string;
  password: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
};
