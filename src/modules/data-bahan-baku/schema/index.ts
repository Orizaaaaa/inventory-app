import { z } from "zod";

export const BahanBakuSchema = z.object({
    name: z.string().min(1, "Bahan baku name wajib diisi").min(3, "Bahan baku name minimal 3 karakter"),
    code: z.string().min(1, "Code wajib diisi").min(2, "Code minimal 2 karakter"),
    unit: z.string().min(1, "Unit wajib diisi"),
    stock: z.number().min(0, "Stock tidak boleh negatif"),
    location: z.string().min(1, "Location wajib diisi"),
    supplier: z.string().optional(),
});

export type BahanBakuFormData = z.infer<typeof BahanBakuSchema>;

