import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Client from '../models/Client';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, nom, telephone, adresse } = req.body;
  const existing = await Client.findOne({ email });
  if (existing) return res.status(400).json({ success: false, error: 'Email déjà utilisé' });

  const client = await Client.create({ email, password, nom, telephone, adresse });
  const token = signToken(client._id.toString()); 
  res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.status(201).json({ success: true, token, data: { id: client._id, nom: client.nom, email: client.email } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ email });
  if (!client || !(await client.comparePassword(password))) {
    return res.status(401).json({ success: false, error: 'Email ou mot de passe incorrect' });
  }
  const token = signToken(client._id.toString());  
  res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.json({ success: true, token, data: { id: client._id, nom: client.nom, role: client.role } });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Déconnecté' });
};