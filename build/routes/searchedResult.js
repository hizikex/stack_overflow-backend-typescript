"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchedResult_1 = require("../controllers/searchedResult");
const Router = express_1.default.Router();
Router.get('/answers/search', searchedResult_1.searchAnswers);
Router.get('/questions/searchresult', searchedResult_1.searchQuestions);
exports.default = Router;
