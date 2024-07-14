"use server";

import { connectToDatabase } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createHash } from "crypto";
import { postSchema, signUpSchema } from "@/app/lib/zod";

/**
 * Inserts a new post into the database.
 *
 * @param formData - The form data containing the post title and content.
 * @returns An object with errors, if any.
 */
export async function insertPost(formData: FormData) {
  const validatedFields = postSchema.safeParse({
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
 * Updates an existing post in the database.
 *
 * @param id - The unique identifier of the post to be updated.
 * @param formData - The form data containing the post title and content.
 * @returns An object with errors, if any.
 */
export async function updatePost(id: string, formData: FormData) {
  const validatedFields = postSchema.safeParse({
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
    UPDATE post
    SET title = ?, content = ?, updated_at = NOW()
    WHERE id = ?
  `;

  const { title, content } = validatedFields.data;
  await connection.execute(query, [title, content, id]);
  await connection.end();

  revalidatePath(`/posts/get/${id}`);
  redirect(`/posts/get/${id}`);
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

/**
 * Signs up a new user by inserting their information into the database.
 *
 * @param formData - The form data containing the user's information.
 */
export async function signUp(formData: FormData) {
  const validationResult = signUpSchema.safeParse({
    user_id: formData.get("user_id"),
    email: formData.get("email"),
    password: formData.get("password"),
    user_name: formData.get("user_name"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { user_id, email, password, user_name } = validationResult.data;
  const hashedPassword = createHash("sha384").update(password).digest("hex");

  const connection = await connectToDatabase();
  const query = `
    INSERT INTO users (user_id, email, password, user_name)
    VALUES (?, ?, ?, ?)
  `;

  await connection.execute(query, [user_id, email, hashedPassword, user_name]);
  await connection.end();

  redirect("/users/sign-in/post");
}
