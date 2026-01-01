import { z } from "zod";

export const PreOrderSchema = z.object({
    orderNumber: z.string().min(1, "Order number wajib diisi").min(3, "Order number minimal 3 karakter"),
    customerName: z.string().min(1, "Customer name wajib diisi").min(3, "Customer name minimal 3 karakter"),
    customerEmail: z.union([z.string().email("Format email tidak valid"), z.literal(""), z.undefined()]).optional(),
    customerPhone: z.string().optional(),
    orderDate: z.string().min(1, "Order date wajib diisi"),
    deliveryDate: z.string().optional(),
    status: z.string().min(1, "Status wajib diisi"),
    totalAmount: z.number().min(0, "Total amount tidak boleh negatif"),
    notes: z.string().optional(),
});

export type PreOrderFormData = z.infer<typeof PreOrderSchema>;

