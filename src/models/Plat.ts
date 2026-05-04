import mongoose, { Document, Schema } from 'mongoose';

export interface IPlat extends Document {
  nom: string;
  prix: number;
  categorie: 'tajine' | 'couscous' | 'grillade' | 'pastilla' | 'salade marocaine' | 'patisserie';
  ingredients: string[];
  disponible: boolean;
  chef?: mongoose.Types.ObjectId;
}

const PlatSchema = new Schema<IPlat>({
  nom: { type: String, required: true, trim: true, unique: true },
  prix: { type: Number, required: true, min: 0 },
  categorie: { type: String, enum: ['tajine', 'couscous', 'grillade', 'pastilla', 'salade marocaine', 'patisserie'], required: true },
  ingredients: [{ type: String, trim: true }],
  disponible: { type: Boolean, default: true },
  chef: { type: Schema.Types.ObjectId, ref: 'Chef' }
}, { timestamps: true });

export default mongoose.model<IPlat>('Plat', PlatSchema);