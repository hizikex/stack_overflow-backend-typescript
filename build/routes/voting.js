"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const voting_1 = require("../controllers/voting");
const Router = express_1.default.Router();
//Voting Questions
Router.patch('/questions/:questionId/upvote', voting_1.upvoteQuestion);
Router.patch('/questions/:questionId/downvote', voting_1.downvoteQuestion);
//Voting Answer
Router.patch('/answers/:questionId/upvote', voting_1.upvoteAnswer);
Router.patch('/answers/:questionId/downvote', voting_1.downvoteAnswer);
exports.default = Router;
