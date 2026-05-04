import Commande from '../models/Commande';
import Plat from '../models/Plat';

export const calculerFraisRetard = (dateReelle: Date, datePrevue: Date): number => {
  const joursRetard = Math.ceil((dateReelle.getTime() - datePrevue.getTime()) / (1000 * 3600 * 24));
  return joursRetard > 0 ? joursRetard * 20 : 0; // 20 DH par jour
};

export const calculerMontantTotal = async (plats: Array<{ platId: string; quantite: number }>): Promise<number> => {
  let total = 0;
  for (const item of plats) {
    const plat = await Plat.findById(item.platId);
    if (!plat) throw new Error(`Plat avec id ${item.platId} introuvable`);
    total += plat.prix * item.quantite;
  }
  return total;
};

export const confirmerLivraison = async (commandeId: string, dateReelle: Date) => {
  const commande = await Commande.findById(commandeId);
  if (!commande) throw new Error('Commande introuvable');
  if (commande.statut === 'livree') throw new Error('Commande déjà livrée');
  
  const frais = calculerFraisRetard(dateReelle, commande.dateLivraisonPrevue);
  commande.dateLivraisonReelle = dateReelle;
  commande.fraisRetard = frais;
  commande.statut = 'livree';
  await commande.save();
  return commande;
};