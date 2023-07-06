"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_1 = require("../controllers/question");
const searchResult_1 = require("../controllers/searchResult");
const Router = express_1.default.Router();
//POST /newquestion
Router.post('/newquestion/:tagId', question_1.createQuestion);
Router.get('/question/:questionId', question_1.getQuestion);
Router.get('/question', question_1.getAllQuestions);
Router.delete('/question/:questionId', question_1.deleteQuestion);
Router.patch('/question/:questionId', question_1.updateQuestion);
Router.get('/questions/searchresult', searchResult_1.searchQuestions);
exports.default = Router;
