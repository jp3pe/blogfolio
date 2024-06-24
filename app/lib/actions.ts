"use server";

import { connectToDatabase } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * The form data interface.
 */
const schema = z.object({
  title: z.string({
    invalid_type_error: "Invalid Title",
  }),
  content: z.string({
    invalid_type_error: "Invalid Content",
  }),
});

/**
 * Inserts a new post into the database.
 *
 * @param formData - The form data containing the post title and content.
 * @returns An object with errors, if any.
 */
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

/**
 * Deletes a post from the database based on the provided ID.
 * After deleting the post, it revalidates the path to refresh the data
 * and redirects to the posts listing page.
 *
 * @param id The unique identifier of the post to be deleted.
 * the path has been revalidated, and the redirection has occurred.
 */
export async function deletePost(id: string) {
  const connection = await connectToDatabase();
  const query = "DELETE FROM post WHERE id = ?";
  await connection.execute(query, [id]);
  await connection.end();
  revalidatePath("/posts/get");
  redirect("/posts/get");
}
