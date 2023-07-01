import { createTag, deleteTag, getAllTag, getTag, updateTag } from "../controllers/tag";
import express from 'express';

const Router = express.Router();

Router.post('/newtag', createTag);
Router.patch('/updatetags/:tagId', updateTag);
Router.get('/tags/:tagId', getTag);
Router.get('/tags/', getAllTag);
Router.delete('/deletetags/:tagId', deleteTag)

export default Router;