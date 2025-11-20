import { z } from "zod";

export const NotaSchema = z.object({
    name: z.string().min(1, "Nota name wajib diisi").min(3, "Nota name minimal 3 karakter"),
});

export type NotaFormData = z.infer<typeof NotaSchema>;

