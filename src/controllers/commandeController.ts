import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Commande from '../models/Commande';
import { calculerMontantTotal, confirmerLivraison } from '../services/commandeService';

export const passerCommande = async (req: AuthRequest, res: Response) => {
  const { plats, delaiJours } = req.body;
  const clientId = req.user!._id;

  const montantTotal = await calculerMontantTotal(plats);
  const dateLivraisonPrevue = new Date();
  dateLivraisonPrevue.setDate(dateLivraisonPrevue.getDate() + delaiJours);

  const commande = await Commande.create({
    client: clientId,
    plats: plats.map((p: any) => ({ plat: p.platId, quantite: p.quantite })),
    dateLivraisonPrevue,
    montantTotal
  });

  res.status(201).json({ success: true, data: commande });
};

export const getMesCommandes = async (req: AuthRequest, res: Response) => {
  const commandes = await Commande.find({ client: req.user!._id }).populate('plats.plat');
  res.json({ success: true, data: commandes });
};

export const livrerCommande = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (typeof id !== 'string') {
    return res.status(400).json({ success: false, error: 'ID invalide' });
  }
  const commande = await confirmerLivraison(id, new Date());
  res.json({ success: true, data: commande });
};