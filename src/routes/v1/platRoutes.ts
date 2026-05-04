import { Router } from 'express';
import { getAllPlats, getPlatById, createPlat, updatePlat, deletePlat } from '../../controllers/platController';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { platCreateSchema, platUpdateSchema } from '../../schemas/platSchema';

const router = Router();

router.route('/')
  .get(getAllPlats)
  .post(protect, authorize('admin'), validate(platCreateSchema), createPlat);

router.route('/:id')
  .get(getPlatById)
  .put(protect, authorize('admin'), validate(platUpdateSchema), updatePlat)
  .delete(protect, authorize('admin'), deletePlat);

export default router;