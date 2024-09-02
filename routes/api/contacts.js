import express from 'express';
import { deleteContact, getAll, getById, patchFavorite, postContact, putContact } from '../../controllers/contacts.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { addSchema, patchSchema, putSchema } from '../../models/contact.js';
import { isValidId } from '../../middlewares/isValid.js';
import { isEmptyBody } from '../../middlewares/isEmptyBody.js';

const router = express.Router();
router.use(authenticate);

router.get('/', cntrlTryCatchWrapper(getAll));
router.get('/:contactId', isValidId, cntrlTryCatchWrapper(getById));
router.post('/', isEmptyBody, validateBody(addSchema), cntrlTryCatchWrapper(postContact));
router.delete('/:contactId', isValidId, cntrlTryCatchWrapper(deleteContact));
router.put('/:contactId', isValidId, isEmptyBody, validateBody(putSchema), cntrlTryCatchWrapper(putContact));
router.patch('/:contactId/favorite', isValidId, isEmptyBody, validateBody(patchSchema), cntrlTryCatchWrapper(patchFavorite))

export default router;