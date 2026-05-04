import { z } from 'zod';

export const chefCreateSchema = z.object({
  nomComplet: z.string().trim().min(3).max(100),
  specialite: z.string().trim().min(2).max(50),
  anneeExperience: z.number().int().min(0).max(60),
  biographie: z.string().max(1000).optional()
});

export const chefUpdateSchema = chefCreateSchema.partial();