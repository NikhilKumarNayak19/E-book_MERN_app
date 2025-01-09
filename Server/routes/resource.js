import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addResource } from '../controllers/resourceControllers.js';

const resourceRouter = express.Router();

resourceRouter.post('/add-resource', userAuth, addResource);

export default resourceRouter;