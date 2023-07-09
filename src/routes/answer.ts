import express from 'express';
import { createAnswer, deleteAnswer,  getAnswersByQuestionId, updateAnswer } from '../controllers/answer';
import { searchAnswers } from '../controllers/searchedResult';

const Router = express.Router();

Router.post('/questions/:questionId/answers', createAnswer);
Router.get('/questions/:questionId/answers', getAnswersByQuestionId);
Router.patch('/answers/:answerId', updateAnswer);
Router.delete('/answers/:answerId', deleteAnswer);

export default Router;