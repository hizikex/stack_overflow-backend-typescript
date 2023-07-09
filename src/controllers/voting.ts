import { Request, Response } from "express";
import Question from "../models/question";
import Answer from "../models/answer";

export const upvoteQuestion = async (req: Request, res: Response) => {
    const {questionId} = req.params;
    try {
        const question = await Question.findByPk(questionId);
        if ( !question) {
            res.status(404).json({
                status: false,
                message: `Question with id: ${questionId} not found`
            })
        } else {
            question.upvotes++;
            question.save();

            question.rating = question.upvotes - question.downvotes;
            question.save();

            res.status(200).json({
                status: true,
                upvote: question.upvotes,
                rate: question.rating
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error, ${error}`
        })
    }
};

export const downvoteQuestion = async (req: Request, res: Response) => {
    const {questionId} = req.params;
    try {
        const question = await Question.findByPk(questionId);
        if ( !question) {
            res.status(404).json({
                status: false,
                message: `Question with id: ${questionId}`
            })
        } else {
            question.downvotes++;
            question.save();

            question.rating = question.upvotes - question.downvotes
            question.save();

            res.status(200).json({
                status: true,
                downvote: question.downvotes,
                rate: question.rating
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error, ${error}`
        })
    }
};

export const upvoteAnswer = async (req: Request, res: Response) => {
    const {answerId} = req.params;
    try {
        const answer = await Answer.findByPk(answerId);
        if ( !answer) {
            res.status(404).json({
                status: false,
                message: `answer with id: ${answerId}`
            })
        } else {
            answer.upvotes++;
            answer.save()

            answer.rating = answer.upvotes - answer.downvotes;
            answer.save();

            res.status(200).json({
                status: true,
                upvote: answer.upvotes,
                rate: answer.rating
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error, ${error}`
        })
    }
};

export const downvoteAnswer = async (req: Request, res: Response) => {
    const {answerId} = req.params;
    try {
        const answer = await Answer.findByPk(answerId);
        if ( !answer) {
            res.status(404).json({
                status: false,
                message: `answer with id: ${answerId}`
            })
        } else {
            const downvote = answer.downvotes++;

            const rating = answer.upvotes - downvote
            answer.save();

            res.status(200).json({
                status: true,
                downvote: answer.downvotes,
                rate: rating
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Internal server error, ${error}`
        })
    }
};