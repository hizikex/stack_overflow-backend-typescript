import { createTag, getTag } from "../controllers/tag";
import express from 'express';

const Router = express.Router();

Router.post('/newtag', createTag);
Router.get('/tag/:tagId', getTag);

export default Router;