import { z } from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1, "Category name wajib diisi").min(3, "Category name minimal 3 karakter"),
});

export type CategoryFormData = z.infer<typeof CategorySchema>;

