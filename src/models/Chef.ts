import mongoose, { Document, Schema } from 'mongoose';

export interface IChef extends Document {
  nomComplet: string;
  specialite: string;
  anneeExperience: number;
  biographie?: string;
}

const ChefSchema = new Schema<IChef>({
  nomComplet: { type: String, required: true, trim: true },
  specialite: { type: String, required: true, trim: true },
  anneeExperience: { type: Number, required: true, min: 0 },
  biographie: { type: String, maxlength: 1000 }
}, { timestamps: true });

export default mongoose.model<IChef>('Chef', ChefSchema);