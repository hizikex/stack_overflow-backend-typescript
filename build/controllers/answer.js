"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnswer = void 0;
const question_1 = __importDefault(require("../models/question"));
const answer_1 = __importDefault(require("../models/answer"));
const createAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    try {
        const { body, authorId } = req.body;
        const answerData = {
            body,
            authorId,
            questionId: Number(questionId)
        };
        const questionObj = yield question_1.default.findByPk(questionId);
        if (!questionObj) {
            res.status(404).json({
                message: `Question with id: ${questionId} not found`
            });
        }
        else {
            const createdAnswer = yield answer_1.default.create(answerData);
            if (!createdAnswer) {
                res.status(400).json({
                    message: `Bad Request`
                });
            }
            else {
                res.status(200).json({
                    message: `Answer to ${questionId} created`,
                    data: createdAnswer
                });
            }
        }
        ;
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.createAnswer = createAnswer;
