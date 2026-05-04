import { z } from 'zod';

export const commandeCreateSchema = z.object({
  plats: z.array(z.object({
    platId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    quantite: z.number().int().min(1)
  })),
  delaiJours: z.number().int().min(1).max(5).default(2)
});