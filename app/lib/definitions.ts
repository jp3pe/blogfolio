export type Post = {
  id: string;
  title: string;
  content?: string | null;
  created_at: Date;
  updated_at: Date;
};
