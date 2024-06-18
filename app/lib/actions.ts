"use server";

import { z } from 'zod';

import { insertPost } from "./db";

const FormSchema = z.object({
  title: z.string({ required_error: 'Please insert a title for the pos.' }),
});


const CreateInvoice = FormSchema.omit({ id: true, content: true, created_at: true, updated_at: true });

export async function actionInsertPost(formData: FormData) {
  await insertPost(title, content);
}
