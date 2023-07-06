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
exports.searchTags = exports.searchAnswers = exports.searchQuestions = void 0;
const sequelize_1 = require("sequelize");
const question_1 = __importDefault(require("../models/question"));
const tag_1 = __importDefault(require("../models/tag"));
const answer_1 = __importDefault(require("../models/answer"));
const searchQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const searchedQuestions = yield question_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { 'title': { [sequelize_1.Op.like]: `%${query}%` } },
                    { 'body': { [sequelize_1.Op.like]: `%${query}%` } }
                ]
            }
        });
        if (searchedQuestions.length === 0) {
            res.status(404).json({
                message: `No result found`
            });
        }
        else {
            res.status(200).json({
                message: `Results found`,
                data: searchedQuestions
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error, ${error}`
        });
    }
});
exports.searchQuestions = searchQuestions;
const searchAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const searchedAnswers = yield answer_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { 'body': { [sequelize_1.Op.like]: `%${query}%` } }
                ]
            }
        });
        if (searchedAnswers.length === 0) {
            res.status(404).json({
                message: `No result found`
            });
        }
        else {
            res.status(200).json({
                message: `Results found`,
                data: searchedAnswers
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Unable to search for answers, ${error}`
        });
    }
});
exports.searchAnswers = searchAnswers;
const searchTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const searchedTags = yield tag_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { 'name': { [sequelize_1.Op.like]: `%${query}%` } }
                ]
            }
        });
        if (searchedTags.length === 0) {
            res.status(404).json({
                message: `No result found`
            });
        }
        else {
            res.status(200).json({
                message: `Results found`,
                data: searchedTags
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Unable to search for answers, ${error}`
        });
    }
});
exports.searchTags = searchTags;
