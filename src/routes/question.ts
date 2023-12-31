import express from "express";
import { createQuestion, deleteQuestion, getAllQuestions, getQuestion, updateQuestion } from "../controllers/question";
import { searchQuestions } from "../controllers/searchedResult";

const Router = express.Router();

//POST /newquestion
Router.post('/newquestion/:tagId', createQuestion)
Router.get('/question/:questionId', getQuestion)
Router.get('/question', getAllQuestions)
Router.delete('/question/:questionId', deleteQuestion)
Router.patch('/question/:questionId', updateQuestion);

export default Router;