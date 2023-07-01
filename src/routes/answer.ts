import express from 'express';
import { createAnswer } from '../controllers/answer';

const Router = express.Router();

Router.post('/answers/:questionId', createAnswer);

export default Router;