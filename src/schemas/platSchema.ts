import { z } from 'zod';

export const platCreateSchema = z.object({
  nom: z.string().trim().min(2).max(100),
  prix: z.number().positive(),
  categorie: z.enum(['tajine', 'couscous', 'grillade', 'pastilla', 'salade marocaine', 'patisserie']),
  ingredients: z.array(z.string()).optional(),
  disponible: z.boolean().optional(),
  chef: z.string().regex(/^[0-9a-fA-F]{24}$/).optional()
});

export const platUpdateSchema = platCreateSchema.partial();