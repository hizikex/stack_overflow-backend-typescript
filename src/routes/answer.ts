import express from 'express';
import { createAnswer, deleteAnswer, getAnswersByQuestionId, updateAnswer } from '../controllers/answer';

const Router = express.Router();

Router.post('/questions/:questionId/answers', createAnswer);
Router.get('/questions/:questionId/answers', getAnswersByQuestionId);
Router.patch('/answers/:answerId', updateAnswer);
Router.delete('/answers/:answerId', deleteAnswer);

export default Router;