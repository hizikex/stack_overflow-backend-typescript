"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const answer_1 = require("../controllers/answer");
const Router = express_1.default.Router();
Router.post('/answers/:questionId', answer_1.createAnswer);
exports.default = Router;
