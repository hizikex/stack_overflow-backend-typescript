import { Request, Response } from "express";
import Question from "../models/question";
import Answer from "../models/answer";

export const createAnswer = async (req:Request, res: Response) => {
    const {questionId} = req.params;
    try {
        const {body, authorId} = req.body;

        type AnswerTrait = {
            body: string;
            authorId: number,
            questionId?: number;
        };

        const answerData: AnswerTrait = {
            body,
            authorId,
            questionId: Number(questionId)
        };

        const questionObj = await Question.findByPk(questionId);
        if ( !questionObj ) {
            res.status(404).json({
                message: `Question with id: ${questionId} not found`
            });
        } else {
            const createdAnswer = await Answer.create(answerData);
            
            if (!createdAnswer) {
                res.status(400).json({
                    message: `Bad Request`
                });
            } else {
                res.status(200).json({
                    message: `Answer to ${questionId} created`,
                    data: createdAnswer
                });
            }
        };
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};