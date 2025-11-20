import { z } from "zod";

export const SupplierSchema = z.object({
    name: z.string().min(1, "Supplier name wajib diisi").min(3, "Supplier name minimal 3 karakter"),
    phone: z.string().min(1, "Phone number wajib diisi").min(10, "Phone number minimal 10 karakter"),
});

export type SupplierFormData = z.infer<typeof SupplierSchema>;