
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Client, { IClient } from '../models/Client';

export interface AuthRequest extends Request {
  user?: IClient;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.cookies?.token) token = req.cookies.token;
  else if (req.headers.authorization?.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, error: 'Non authentifié' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await Client.findById(decoded.id).select('-password');
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token invalide' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ success: false, error: 'Non authentifié' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: `Rôle ${req.user.role} non autorisé` });
    }
    next();
  };
};