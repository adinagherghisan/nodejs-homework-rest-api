import express from 'express';
import { deleteContact, getAll, getById, patchFavorite, postContact, putContact } from '../../controllers/contacts.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { addSchema, patchSchema, putSchema } from '../../models/contact.js';

const router = express.Router();

router.get('/', authenticate, cntrlTryCatchWrapper(getAll));
router.get('/:contactId', authenticate, cntrlTryCatchWrapper(getById));
router.post('/', authenticate, validateBody(addSchema), cntrlTryCatchWrapper(postContact));
router.delete('/:contactId', authenticate, cntrlTryCatchWrapper(deleteContact));
router.put('/:contactId', authenticate, validateBody(putSchema), cntrlTryCatchWrapper(putContact));
router.patch('/:contactId/favorite', authenticate, validateBody(patchSchema), cntrlTryCatchWrapper(patchFavorite))

export default router;