import { z } from "zod";

export const VendorSchema = z.object({
    name: z.string().min(1, "Vendor name wajib diisi").min(3, "Vendor name minimal 3 karakter"),
    email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
    phone: z.string().min(1, "Phone number wajib diisi").min(10, "Phone number minimal 10 karakter"),
    address: z.string().min(1, "Address wajib diisi").min(5, "Address minimal 5 karakter"),
});

export type VendorFormData = z.infer<typeof VendorSchema>;

