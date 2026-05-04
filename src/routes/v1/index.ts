import { Router } from 'express';
import platRoutes from './platRoutes';
import chefRoutes from './chefRoutes';
import commandeRoutes from './commandeRoutes';
import clientRoutes from './clientRoutes';

const router = Router();
router.use('/plats', platRoutes);
router.use('/chefs', chefRoutes);
router.use('/commandes', commandeRoutes);
router.use('/clients', clientRoutes);

export default router;