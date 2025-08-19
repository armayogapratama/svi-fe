import { z } from "zod";

export const ArticleSchema = z.object({
  title: z.string().min(20, "Judul minimal 20 karakter"),
  category: z.string().min(3, "Kategori minimal 3 karakter"),
  content: z.string().min(200, "Isi minimal 200 karakter"),
});

export type NoteSchemaType = z.infer<typeof ArticleSchema>;
