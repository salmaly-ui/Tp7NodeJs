import mongoose, { Document, Schema } from 'mongoose';
import { IPlat } from './Plat';
import { IClient } from './Client';

export interface ICommande extends Document {
  client: IClient['_id'];
  plats: Array<{ plat: IPlat['_id']; quantite: number }>;
  dateCommande: Date;
  dateLivraisonPrevue: Date;
  dateLivraisonReelle?: Date;
  statut: 'en_attente' | 'confirmee' | 'livree' | 'annulee';
  fraisRetard?: number;
  montantTotal: number;
}

const CommandeSchema = new Schema<ICommande>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  plats: [{
    plat: { type: Schema.Types.ObjectId, ref: 'Plat', required: true },
    quantite: { type: Number, required: true, min: 1 }
  }],
  dateCommande: { type: Date, default: Date.now },
  dateLivraisonPrevue: { type: Date, required: true },
  dateLivraisonReelle: { type: Date },
  statut: { type: String, enum: ['en_attente', 'confirmee', 'livree', 'annulee'], default: 'en_attente' },
  fraisRetard: { type: Number, default: 0 },
  montantTotal: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model<ICommande>('Commande', CommandeSchema);