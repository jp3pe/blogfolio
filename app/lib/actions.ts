"use server";

import { connectToDatabase } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createHash } from "crypto";
import { FieldPacket } from "mysql2";

/**
 * The form data interface.
 */
const postSchema = z.object({
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

const userSchema = z.object({
  user_id: z
    .string()
    .min(1, "사용자 ID는 필수입니다.")
    .max(20, "사용자 ID는 20자 이하여야 합니다.")
    .regex(/^[a-zA-Z0-9]+$/, "사용자 ID는 영문자와 숫자만 포함할 수 있습니다."),
  email: z
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .max(255, "이메일 주소는 255자 이하여야 합니다."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z]).*$/,
      "비밀번호는 대문자와 소문자를 모두 포함해야 합니다."
    ),
  username: z
    .string()
    .min(1, "사용자 이름은 필수입니다.")
    .max(255, "사용자 이름은 255자 이하여야 합니다."),
});

// TODO: userSchema를 사용하고 필요 없는 항목을 생략하는 식으로 수정하기
const userLoginSchema = z.object({
  email: z
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .max(255, "이메일 주소는 255자 이하여야 합니다."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z]).*$/,
      "비밀번호는 대문자와 소문자를 모두 포함해야 합니다."
    ),
});

/**
 * Signs up a new user by inserting their information into the database.
 *
 * @param formData - The form data containing the user's information.
 */
export async function signUp(formData: FormData) {
  const validationResult = userSchema.safeParse({
    user_id: formData.get("user_id"),
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  });

  if (!validationResult.success) {
    throw new Error("Validation failed");
  }

  const { user_id, email, password, username } = validationResult.data;
  const hashedPassword = createHash("sha384").update(password).digest("hex");

  const connection = await connectToDatabase();
  const query = `
    INSERT INTO users (user_id, email, password, username)
    VALUES (?, ?, ?, ?)
  `;

  await connection.execute(query, [user_id, email, hashedPassword, username]);
  await connection.end();

  revalidatePath("/");
  redirect("/");
}

export async function signIn(formData: FormData) {
  const validationResult = userLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    throw new Error("Validation failed");
  }

  const { email, password } = validationResult.data;
  const hashedPassword = createHash("sha384").update(password).digest("hex");

  const connection = await connectToDatabase();
  const query = `
   SELECT * FROM users
   WHERE email = ? AND password = ?
 `;

  const [rows] = (await connection.execute(query, [email, hashedPassword])) as [
    any[],
    FieldPacket[]
  ];
  await connection.end();

  if (rows && rows.length > 0) {
    console.log("로그인 성공");
    revalidatePath("/");
    redirect("/");
  } else {
    console.log("로그인 실패");
    revalidatePath("/users/sign-in");
    redirect("/users/sign-in");
  }
}
