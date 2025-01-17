import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addResource, deleteResource, getAllResource, getRecentlyAddedResources, getResourceByCategory, getResourceById, updateResource } from '../controllers/resourceControllers.js';


const resourceRouter = express.Router();

resourceRouter.post('/add-resource',  addResource);
resourceRouter.put('/update-resource',  updateResource);
resourceRouter.post('/delete-resource',  deleteResource);
resourceRouter.get('/get-all-resource', getAllResource);
resourceRouter.get('/get-recently-added-resource', getRecentlyAddedResources);
resourceRouter.get('/get-resource-by-id/:id', getResourceById);
resourceRouter.post('/category', getResourceByCategory);




export default resourceRouter;