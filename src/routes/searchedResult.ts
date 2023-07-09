import express from "express";
import { searchAnswers, searchQuestions } from "../controllers/searchedResult";

const Router = express.Router();

Router.get('/answers/search', searchAnswers);
Router.get('/questions/searchresult', searchQuestions);

export default Router;