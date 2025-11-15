import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter").min(1, "Password wajib diisi"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

