import express from 'express';
import { downvoteAnswer, downvoteQuestion, upvoteAnswer, upvoteQuestion } from '../controllers/voting';

const Router = express.Router();

//Voting Questions
Router.patch('/questions/:questionId/upvote', upvoteQuestion);
Router.patch('/questions/:questionId/downvote', downvoteQuestion);

//Voting Answer
Router.patch('/answers/:questionId/upvote', upvoteAnswer);
Router.patch('/answers/:questionId/downvote', downvoteAnswer);

export default Router;