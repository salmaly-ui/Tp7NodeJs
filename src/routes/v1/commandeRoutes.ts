import { Router } from 'express';
import { passerCommande, getMesCommandes, livrerCommande } from '../../controllers/commandeController';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { commandeCreateSchema } from '../../schemas/commandeSchema';

const router = Router();
router.use(protect); // toutes les routes commandes nécessitent authentification

router.route('/')
  .post(validate(commandeCreateSchema), passerCommande)
  .get(authorize('client'), getMesCommandes);

router.patch('/:id/livrer', authorize('livreur', 'admin'), livrerCommande);

export default router;