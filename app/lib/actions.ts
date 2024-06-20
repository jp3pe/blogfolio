"use server";

import { connectToDatabase } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z.string({
    invalid_type_error: "Invalid Title",
  }),
  content: z.string({
    invalid_type_error: "Invalid Content",
  }),
});

export async function insertPost(formData: FormData) {
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const connection = await connectToDatabase();
  const query = `
    INSERT INTO post (title, content)
    VALUES (?, ?)
  `;

  const { title, content } = validatedFields.data;
  await connection.execute(query, [title, content]);
  await connection.end();

  revalidatePath("/posts/get");
  redirect("/posts/get");
}
