import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addReadLater, deleteFromReadLater, getReadLater } from '../controllers/readLaterControllers.js';

const readLaterRouter = express.Router();

readLaterRouter.put('/add-resource-to-read-later', userAuth, addReadLater)
readLaterRouter.post('/delete-resource-from-read-later', userAuth, deleteFromReadLater)
readLaterRouter.post('/fetch-all-resource-from-read-later', userAuth, getReadLater )




export default readLaterRouter;