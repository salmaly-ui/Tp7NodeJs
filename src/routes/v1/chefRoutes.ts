import { Router } from 'express';
import { getAllChefs, getChefById, createChef, updateChef, deleteChef } from '../../controllers/chefController';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { chefCreateSchema, chefUpdateSchema } from '../../schemas/chefSchema';

const router = Router();

router.route('/')
  .get(getAllChefs)
  .post(protect, authorize('admin'), validate(chefCreateSchema), createChef);

router.route('/:id')
  .get(getChefById)
  .put(protect, authorize('admin'), validate(chefUpdateSchema), updateChef)
  .delete(protect, authorize('admin'), deleteChef);

export default router;