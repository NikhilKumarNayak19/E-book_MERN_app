import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addReadLater, deleteFromReadLater, getReadLater } from '../controllers/readLaterControllers.js';

const readLaterRouter = express.Router();

// Add resource to "Read Later"
readLaterRouter.put('/add-resource-to-read-later', userAuth, addReadLater);

// Delete resource from "Read Later"
readLaterRouter.post('/delete-resource-from-read-later', userAuth, deleteFromReadLater);

// Fetch all "Read Later" resources
readLaterRouter.get('/fetch-all-resource-from-read-later', userAuth, getReadLater);

export default readLaterRouter;
