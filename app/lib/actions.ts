"use server";

import { connectToDatabase } from "@/app/lib/db";

interface FormData {
  title: string;
  content: string;
}

export async function insertPost(formData: FormData) {
  const connection = await connectToDatabase();
  const query = `
    INSERT INTO post (title, content)
    VALUES (?, ?)
  `;
  await connection.execute(query, [formData.title, formData.content]);
  await connection.end();
}
