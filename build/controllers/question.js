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
exports.updateQuestion = exports.deleteQuestion = exports.getAllQuestions = exports.getQuestion = exports.createQuestion = void 0;
const question_1 = __importDefault(require("../models/question"));
const tag_1 = __importDefault(require("../models/tag"));
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tagId = req.params.tagId;
    try {
        const { title, body, authorId } = req.body;
        const questionData = {
            title,
            body,
            authorId,
            tagId: Number(tagId)
        };
        const tagObj = yield tag_1.default.findByPk(tagId);
        console.log(tagObj);
        if (tagObj) {
            const createdQuestion = yield question_1.default.create(questionData);
            if (!exports.createQuestion) {
                res.status(400).json({
                    message: `Bad Request`
                });
            }
            res.status(200).json({
                message: "Question created successfully",
                question: createdQuestion,
            });
        }
        else {
            res.status(404).json({
                message: "Tag not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.createQuestion = createQuestion;
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId } = req.params;
        //Find the question by the id
        const question = yield question_1.default.findByPk(questionId, { attributes: ['title', 'authorId', 'tagId'] });
        if (!question) {
            res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        else {
            res.status(200).json({
                message: `Displaying question with id: ${questionId}`,
                data: question
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Error retrieving question ${error}`
        });
    }
});
exports.getQuestion = getQuestion;
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allQuestions = yield question_1.default.findAll({ attributes: ['id', 'title', 'body', 'authorId', 'tagId'] });
        console.log(allQuestions);
        if (!allQuestions) {
            res.status(404).json({
                success: false,
                message: `Cannot find any question`
            });
        }
        else {
            res.status(200).json({
                message: `Available Questions are ${allQuestions.length}`,
                data: allQuestions
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Error retrieving question ${error}`
        });
    }
});
exports.getAllQuestions = getAllQuestions;
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId } = req.params;
        const deletedQuestion = yield question_1.default.destroy({ where: { id: questionId } });
        if (!deletedQuestion) {
            res.status(404).json({
                success: false,
                message: `Question with id: ${questionId} not found`
            });
        }
        else {
            res.status(200).json({
                message: `Question with id: ${questionId} is successfully deleted`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Server error, ${error}`
        });
    }
});
exports.deleteQuestion = deleteQuestion;
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId } = req.params;
        const { title, body, authorId, tagId } = req.body;
        const questionData = {
            title,
            body,
            authorId,
            tagId: Number(tagId)
        };
        const updatedQuestion = yield question_1.default.update(questionData, {
            where: {
                id: questionId
            }
        });
        if (updatedQuestion[0] === 0) {
            res.status(404).json({
                message: `No Question Found`
            });
        }
        else {
            res.status(201).json({
                message: `Question updated successfully`,
                data: updatedQuestion[0]
            });
        }
    }
    catch (error) {
        res.status(500).json({
            meessage: `Internal Server Error, ${error}`
        });
    }
});
exports.updateQuestion = updateQuestion;
