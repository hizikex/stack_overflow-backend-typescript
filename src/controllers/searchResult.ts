import { Op } from "sequelize";
import { Request, Response, query } from "express";
import Question from "../models/question";
import Tag from "../models/tag";
import Answer from "../models/answer";

export const searchQuestions = async (req:Request, res:Response) => {
    try {
        const {query} = req.query;
        const searchedQuestions = await Question.findAll({
            where: {
                [Op.or]: [
                    {'title': {[Op.like]: `%${query}%`}},
                    {'body': {[Op.like]: `%${query}%`}}
                ]
            }
        });
        
        if (searchedQuestions.length === 0) {
            res.status(404).json({
                message: `No result found`
            })
        } else {
            res.status(200).json({
                message: `Results found`,
                data: searchedQuestions
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error, ${error}`
        })
    }
};

export const searchAnswers = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const searchedAnswers = await Answer.findAll({
            where: {
                [Op.or]: [
                    {'body': {[Op.like]: `%${query}%`}}
                ]
            }
        });
        if (searchedAnswers.length === 0) {
            res.status(404).json({
                message: `No result found`
            })
        } else {
            res.status(200).json({
                message: `Results found`,
                data: searchedAnswers
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Unable to search for answers, ${error}`
        })
    }
};

export const searchTags = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const searchedTags = await Tag.findAll({
            where: {
                [Op.or]: [
                    {'name': {[Op.like]: `%${query}%`}}
                ]
            }
        });
        if (searchedTags.length === 0) {
            res.status(404).json({
                message: `No result found`
            })
        } else {
            res.status(200).json({
                message: `Results found`,
                data: searchedTags
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Unable to search for answers, ${error}`
        })
    }
};