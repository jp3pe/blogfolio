import mysql, { FieldPacket } from "mysql2/promise";
import nextConfig from "@/next.config.mjs";
import { Post } from "@/app/lib/definitions";

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: nextConfig.env.MYSQL_HOST,
    user: nextConfig.env.MYSQL_USER,
    password: nextConfig.env.MYSQL_PASSWORD,
    database: nextConfig.env.MYSQL_DATABASE,
  });
  return connection;
}

export async function fetchAllPosts(): Promise<Post[]> {
  const connection = await connectToDatabase();
  const query = "SELECT * FROM post";
  const [rows] = (await connection.execute(query)) as [any[], FieldPacket[]];
  await connection.end();

  const posts: Post[] = rows.map((row: Post) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    created_at: new Date(row.created_at),
    updated_at: new Date(row.updated_at),
  }));

  return posts;
}
