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
exports.downvoteAnswer = exports.upvoteAnswer = exports.downvoteQuestion = exports.upvoteQuestion = void 0;
const question_1 = __importDefault(require("../models/question"));
const answer_1 = __importDefault(require("../models/answer"));
const user_1 = __importDefault(require("../models/user"));
const upvoteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    const { userId } = req.params;
    try {
        const question = yield question_1.default.findByPk(questionId);
        if (!question) {
            res.status(404).json({
                status: false,
                message: `Question with id: ${questionId} not found`
            });
        }
        else {
            question.upvotes++;
            question.save();
            question.rating = question.upvotes - question.downvotes;
            question.save();
            const user = yield user_1.default.findByPk(userId);
            if (user) {
                user.reputation += 1;
                yield user.save();
            }
            res.status(200).json({
                status: true,
                upvote: question.upvotes,
                downvotes: question.downvotes,
                rate: question.rating,
                userReputation: user.reputation
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to upvote question, ${error}`
        });
    }
});
exports.upvoteQuestion = upvoteQuestion;
const downvoteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    const { userId } = req.params;
    try {
        const question = yield question_1.default.findByPk(questionId);
        if (!question) {
            res.status(404).json({
                status: false,
                message: `Question with id: ${questionId}`
            });
        }
        else {
            question.downvotes++;
            question.save();
            question.rating = question.upvotes - question.downvotes;
            question.save();
            const user = yield user_1.default.findByPk(userId);
            if (user) {
                user.reputation += 1;
                yield user.save();
            }
            ;
            res.status(200).json({
                status: true,
                upvotes: question.upvotes,
                downvotes: question.downvotes,
                rate: question.rating,
                userReputation: user.reputation
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `IFailed to upvote question, ${error}`
        });
    }
});
exports.downvoteQuestion = downvoteQuestion;
const upvoteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = req.params;
    const { userId } = req.params;
    try {
        const answer = yield answer_1.default.findByPk(answerId);
        if (!answer) {
            res.status(404).json({
                status: false,
                message: `answer with id: ${answerId}`
            });
        }
        else {
            answer.upvotes++;
            answer.save();
            answer.rating = answer.upvotes - answer.downvotes;
            answer.save();
            const user = yield user_1.default.findByPk(userId);
            if (user) {
                user.reputation += 1;
                yield user.save();
            }
            ;
            res.status(200).json({
                status: true,
                upvotes: answer.upvotes,
                downvotes: answer.downvotes,
                rate: answer.rating,
                reputation: user.reputation
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to upvote question, ${error}`
        });
    }
});
exports.upvoteAnswer = upvoteAnswer;
const downvoteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = req.params;
    const { userId } = req.params;
    try {
        const answer = yield answer_1.default.findByPk(answerId);
        if (!answer) {
            res.status(404).json({
                status: false,
                message: `answer with id: ${answerId}`
            });
        }
        else {
            const downvote = answer.downvotes++;
            const rating = answer.upvotes - downvote;
            answer.save();
            const user = yield user_1.default.findByPk(userId);
            if (user) {
                user.reputation += 1;
                yield user.save();
            }
            ;
            res.status(200).json({
                status: true,
                upvote: answer.upvotes,
                downvote: answer.downvotes,
                rate: rating,
                reputation: user.reputation
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Failed to upvote question, ${error}`
        });
    }
});
exports.downvoteAnswer = downvoteAnswer;
