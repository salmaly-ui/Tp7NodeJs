import { Request, Response } from 'express';
import Plat from '../models/Plat';

export const getAllPlats = async (req: Request, res: Response) => {
  const { categorie, minPrix, maxPrix, disponible } = req.query;
  const filter: any = {};
  if (categorie) filter.categorie = categorie;
  if (disponible) filter.disponible = disponible === 'true';
  if (minPrix || maxPrix) {
    filter.prix = {};
    if (minPrix) filter.prix.$gte = Number(minPrix);
    if (maxPrix) filter.prix.$lte = Number(maxPrix);
  }
  const plats = await Plat.find(filter).populate('chef');
  res.json({ success: true, count: plats.length, data: plats });
};

export const getPlatById = async (req: Request, res: Response) => {
  const plat = await Plat.findById(req.params.id).populate('chef');
  if (!plat) return res.status(404).json({ success: false, error: 'Plat non trouvé' });
  res.json({ success: true, data: plat });
};

export const createPlat = async (req: Request, res: Response) => {
  const plat = await Plat.create(req.body);
  res.status(201).json({ success: true, data: plat });
};

export const updatePlat = async (req: Request, res: Response) => {
  const plat = await Plat.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!plat) return res.status(404).json({ success: false, error: 'Plat non trouvé' });
  res.json({ success: true, data: plat });
};

export const deletePlat = async (req: Request, res: Response) => {
  const plat = await Plat.findByIdAndDelete(req.params.id);
  if (!plat) return res.status(404).json({ success: false, error: 'Plat non trouvé' });
  res.json({ success: true, message: 'Plat supprimé' });
};