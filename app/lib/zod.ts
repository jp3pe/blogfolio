import { object, string } from "zod";

export const postSchema = object({
  title: string({
    invalid_type_error: "Invalid Title",
  }),
  content: string({
    invalid_type_error: "Invalid Content",
  }),
});

export const signInSchema = object({
  email: string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .max(255, "이메일 주소는 255자 이하여야 합니다."),
  password: string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z]).*$/,
      "비밀번호는 대문자와 소문자를 모두 포함해야 합니다."
    ),
});

export const signUpSchema = object({
  user_id: string()
    .min(1, "사용자 ID는 필수입니다.")
    .max(20, "사용자 ID는 20자 이하여야 합니다.")
    .regex(/^[a-zA-Z0-9]+$/, "사용자 ID는 영문자와 숫자만 포함할 수 있습니다."),
  email: string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .max(255, "이메일 주소는 255자 이하여야 합니다."),
  password: string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z]).*$/,
      "비밀번호는 대문자와 소문자를 모두 포함해야 합니다."
    ),
  user_name: string()
    .min(1, "사용자 이름은 필수입니다.")
    .max(255, "사용자 이름은 255자 이하여야 합니다."),
});
