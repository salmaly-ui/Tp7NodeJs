import { Request, Response } from 'express';
import Chef from '../models/Chef';

export const getAllChefs = async (req: Request, res: Response) => {
  const chefs = await Chef.find();
  res.json({ success: true, data: chefs });
};

export const getChefById = async (req: Request, res: Response) => {
  const chef = await Chef.findById(req.params.id);
  if (!chef) return res.status(404).json({ success: false, error: 'Chef non trouvé' });
  res.json({ success: true, data: chef });
};

export const createChef = async (req: Request, res: Response) => {
  const chef = await Chef.create(req.body);
  res.status(201).json({ success: true, data: chef });
};

export const updateChef = async (req: Request, res: Response) => {
  const chef = await Chef.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!chef) return res.status(404).json({ success: false, error: 'Chef non trouvé' });
  res.json({ success: true, data: chef });
};

export const deleteChef = async (req: Request, res: Response) => {
  const chef = await Chef.findByIdAndDelete(req.params.id);
  if (!chef) return res.status(404).json({ success: false, error: 'Chef non trouvé' });
  res.json({ success: true, message: 'Chef supprimé' });
};