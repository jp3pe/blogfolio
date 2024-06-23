import mysql, { FieldPacket } from "mysql2/promise";
import nextConfig from "@/next.config.mjs";
import { PostType } from "@/app/lib/definitions";

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: nextConfig.env.MYSQL_HOST,
    user: nextConfig.env.MYSQL_USER,
    password: nextConfig.env.MYSQL_PASSWORD,
    database: nextConfig.env.MYSQL_DATABASE,
  });
  return connection;
}

export async function fetchAllPosts(): Promise<PostType[]> {
  const connection = await connectToDatabase();
  const query = "SELECT * FROM post";
  const [rows] = (await connection.execute(query)) as [any[], FieldPacket[]];
  await connection.end();

  const posts: PostType[] = rows.map((row: PostType) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    created_at: new Date(row.created_at),
    updated_at: new Date(row.updated_at),
  }));

  return posts;
}

export async function fetchPost(id: string): Promise<PostType | null> {
  const connection = await connectToDatabase();
  const query = "SELECT * FROM post WHERE id = ?";
  const [rows] = (await connection.execute(query, [id])) as [any[], FieldPacket[]];
  await connection.end();

  let post = null;

  if (rows && rows.length > 0) {
    post = {
      id: rows[0].id,
      title: rows[0].title,
      content: rows[0].content,
      created_at: new Date(rows[0].created_at),
      updated_at: new Date(rows[0].updated_at),
    };
  }

  return post;
}
