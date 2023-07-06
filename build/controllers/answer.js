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
exports.deleteAnswer = exports.updateAnswer = exports.getAnswerUsingIndex = exports.getAnswersByQuestionId = exports.createAnswer = void 0;
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
                    message: `Answer to question to id: ${questionId} has been created`,
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
const getAnswersByQuestionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId } = req.params;
        const questionObj = yield question_1.default.findByPk(questionId);
        if (!questionObj) {
            res.status(404).json({
                message: `Question with id: ${questionId} not found`,
            });
        }
        else {
            const answeredQuestionById = yield answer_1.default.findAll({ where: { id: questionId }, attributes: [
                    'id',
                    'body',
                    'questionId'
                ] });
            if (!answeredQuestionById) {
                res.status(404).json({
                    message: `Answers to ${questionId} with not found`
                });
            }
            else {
                res.status(200).json({
                    message: `Answer to question with id no: ${questionId}`,
                    data: answeredQuestionById
                });
            }
        }
        ;
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error}`
        });
    }
    ;
});
exports.getAnswersByQuestionId = getAnswersByQuestionId;
const getAnswerUsingIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req.query;
        const indexResult = yield answer_1.default.findAll({ i });
        console.log(indexResult);
        if (!indexResult) {
            res.status(404).json({
                message: `Result not found`
            });
        }
        else {
            res.status(200).json({
                message: `Searched result`,
                data: indexResult
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server error, ${error}`
        });
    }
});
exports.getAnswerUsingIndex = getAnswerUsingIndex;
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = req.params;
    try {
        const { body, authorId } = req.body;
        const updateData = {
            body,
            authorId
        };
        const answer = yield answer_1.default.findByPk(answerId);
        if (!answer) {
            res.status(404).json({
                message: `Answer not found`
            });
        }
        else {
            const updatedAnswer = yield answer_1.default.update(updateData, { where: { id: answerId } });
            if (updatedAnswer[0] === 0) {
                res.status(404).json({
                    message: `Answer not found`
                });
            }
            else {
                res.status(200).json({
                    message: `Answer with id no: ${answerId} updated successfully`,
                    data: updatedAnswer[0]
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Error updating answer, ${error}`
        });
    }
});
exports.updateAnswer = updateAnswer;
const deleteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = req.params;
    try {
        const answer = yield answer_1.default.findByPk(answerId);
        if (!answer) {
            res.status(404).json({
                message: `Answer not found`
            });
        }
        else {
            yield answer.destroy;
            res.status(201).json({
                message: `Answer deleted successfully`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Error deleting answer, ${error}`
        });
    }
});
exports.deleteAnswer = deleteAnswer;
