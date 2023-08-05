import express from 'express';
import { downvoteAnswer, downvoteQuestion, upvoteAnswer, upvoteQuestion } from '../controllers/voting';

const Router = express.Router();

//Voting Questions
Router.patch('/questions/:questionId/:userId/upvote', upvoteQuestion);
Router.patch('/questions/:questionId/:userId/downvote', downvoteQuestion);

//Voting Answer
Router.patch('/answers/:questionId/:userId/upvote', upvoteAnswer);
Router.patch('/answers/:questionId/:userId/downvote', downvoteAnswer);

export default Router;