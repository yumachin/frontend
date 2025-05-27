import { z } from "zod";

export const ProfileSchema = z.object({
  userName: z
    .string()
    .min(1, "ユーザー名は必須です")
    .max(10, "ユーザー名は10文字以下で入力してください"),
});

export type ProfileFormData = z.infer<typeof ProfileSchema>;