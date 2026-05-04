import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nom: z.string().min(2),
  telephone: z.string().regex(/^(\+212|0)[6-7]\d{8}$/),
  adresse: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});