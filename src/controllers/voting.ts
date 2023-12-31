import { Request, Response } from "express";
import Question from "../models/question";
import Answer from "../models/answer";
import User from "../models/user";

export const upvoteQuestion = async (req: Request, res: Response) => {
    const {questionId} = req.params;
    const {userId} = req.params;
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

            const user = await User.findByPk(userId);
            if (user) {
                user.reputation += 1;
                await user.save();
            }

            res.status(200).json({
                status: true,
                upvote: question.upvotes,
                downvotes: question.downvotes,
                rate: question.rating,
                userReputation: user!.reputation
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to upvote question, ${error}`
        })
    }
};

export const downvoteQuestion = async (req: Request, res: Response) => {
    const {questionId} = req.params;
    const {userId} = req.params;
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

            const user = await User.findByPk(userId);
            if (user) {
                user.reputation += 1;
                await user.save();
            };

            res.status(200).json({
                status: true,
                upvotes: question.upvotes,
                downvotes: question.downvotes,
                rate: question.rating,
                userReputation: user!.reputation
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `IFailed to upvote question, ${error}`
        })
    }
};

export const upvoteAnswer = async (req: Request, res: Response) => {
    const {answerId} = req.params;
    const {userId} = req.params;
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

            const user = await User.findByPk(userId);
            if (user) {
                user.reputation += 1;
                await user.save();
            };

            res.status(200).json({
                status: true,
                upvotes: answer.upvotes,
                downvotes: answer.downvotes,
                rate: answer.rating,
                reputation: user!.reputation
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to upvote question, ${error}`
        })
    }
};

export const downvoteAnswer = async (req: Request, res: Response) => {
    const {answerId} = req.params;
    const {userId} = req.params;
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

            const user = await User.findByPk(userId);
            if (user) {
                user.reputation += 1;
                await user.save();
            };

            res.status(200).json({
                status: true,
                upvote: answer.upvotes,
                downvote: answer.downvotes,
                rate: rating,
                reputation: user!.reputation
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Failed to upvote question, ${error}`
        })
    }
};