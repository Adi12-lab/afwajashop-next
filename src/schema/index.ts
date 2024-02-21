import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email tidak valid")
    .min(2, { message: "Email harus ada" }),
  password: z.string().min(2, { message: "Password diperlukan" }),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .email("Email tidak valid")
      .min(2, { message: "Email harus ada" }),
    password: z.string().min(2, { message: "Password diperlukan" }),
    confirmPassword: z
      .string()
      .min(2, { message: "Konfirmasi password diperlukan" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password konfirmmasi tidak cocok",
    path: ["confirmPassword"], // menentukan path untuk error
  });

export const searchSchema = z.object({
  search: z.string().min(2, { message: "Kunci pencarian dibutuhkan" }),
});

export const categorySchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(2, { message: "Nama kategori diperlukan" }),
  image: z.optional(z.string()),
  isActive: z.boolean(),
  _count: z.optional(
    z.object({
      product: z.number(),
    })
  ),
});
