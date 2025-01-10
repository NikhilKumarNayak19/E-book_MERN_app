import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addResource, deleteResource, getAllResource, getRecentlyAddedResources, getResourceById, updateResource } from '../controllers/resourceControllers.js';


const resourceRouter = express.Router();

resourceRouter.post('/add-resource', userAuth, addResource);
resourceRouter.put('/update-resource', userAuth, updateResource);
resourceRouter.post('/delete-resource', userAuth, deleteResource);
resourceRouter.get('/get-all-resource', userAuth, getAllResource);
resourceRouter.get('/get-recently-added-resource', userAuth, getRecentlyAddedResources);
resourceRouter.get('/get-resource-by-id/:id', userAuth, getResourceById);



export default resourceRouter;