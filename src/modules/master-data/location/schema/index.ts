import { z } from "zod";

export const LocationSchema = z.object({
    name: z.string().min(1, "Location name wajib diisi").min(3, "Location name minimal 3 karakter"),
});

export type LocationFormData = z.infer<typeof LocationSchema>;

