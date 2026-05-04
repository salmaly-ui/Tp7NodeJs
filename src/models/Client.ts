import mongoose, { Document, Schema } from 'mongoose';
import { hashPassword, comparePassword } from '../config/password';

export interface IClient extends Document {
  email: string;
  password: string;
  nom: string;
  telephone: string;
  adresse?: string;
  role: 'client' | 'livreur' | 'admin';
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const ClientSchema = new Schema<IClient>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  adresse: { type: String },
  role: { type: String, enum: ['client', 'livreur', 'admin'], default: 'client' }
}, { timestamps: true });

 ClientSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
});

ClientSchema.methods.comparePassword = async function(enteredPassword: string) {
  return await comparePassword(enteredPassword, this.password);
};

export default mongoose.model<IClient>('Client', ClientSchema);