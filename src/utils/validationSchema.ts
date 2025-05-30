import { z } from "zod";

export const ProfileSchema = z.object({
  userName: z
    .string()
    .min(1, "ユーザー名は必須です")
    .max(15, "ユーザー名は15文字以下で入力してください"),
});
export type ProfileFormData = z.infer<typeof ProfileSchema>;

export const WatchwordSchema = z.object({
  watchword: z
    .string()
    .min(1, "合言葉は必須です")
    .max(6, "合言葉は6文字以下で入力してください"),
});
export type WatchwordFormData = z.infer<typeof WatchwordSchema>;