import mysql, { FieldPacket } from "mysql2/promise";
import nextConfig from "@/next.config.mjs";
import { PostType } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Connects to the database using the provided configuration.
 * @returns {Promise<mysql.Connection>} A promise that resolves to a MySQL connection object.
 */
export async function connectToDatabase(): Promise<mysql.Connection> {
  const connection = await mysql.createConnection({
    host: nextConfig.env.MYSQL_HOST,
    user: nextConfig.env.MYSQL_USER,
    password: nextConfig.env.MYSQL_PASSWORD,
    database: nextConfig.env.MYSQL_DATABASE,
    timezone: nextConfig.env.MYSQL_TIMEZONE,
  });
  return connection;
}

/**
 * Fetches all posts from the database.
 * @returns {Promise<PostType[]>} A promise that resolves to an array of post objects.
 */
export async function fetchAllPosts(): Promise<PostType[]> {
  noStore();

  const connection = await connectToDatabase();
  const query = "SELECT * FROM post ORDER BY updated_at DESC";
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

/**
 * Fetches a post from the database by its ID.
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<PostType | null>} A promise that resolves to a post object, or null if no post was found.
 */
export async function fetchPost(id: string): Promise<PostType | null> {
  noStore();

  const connection = await connectToDatabase();
  const query = "SELECT * FROM post WHERE id = ?";
  const [rows] = (await connection.execute(query, [id])) as [
    any[],
    FieldPacket[]
  ];
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
