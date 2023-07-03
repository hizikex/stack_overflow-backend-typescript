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
                    message: `Answer to question to id: ${questionId} has been created`,
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

export const getAnswersByQuestionId = async (req: Request, res: Response) => {
    try {
        const {questionId} = req.params;
        const questionObj = await Question.findByPk(questionId);

        if (!questionObj) {
            res.status(404).json({
                message: `Question with id: ${questionId} not found`,
            });
        } else {
            const answeredQuestionById = await Answer.findAll({where: { id: questionId},attributes: [
                'id',
                'body',
                'questionId'
            ]});
            if ( !answeredQuestionById ) {
                res.status(404).json({
                    message: `Answers to ${questionId} with not found`
                })
            } else {
                res.status(200).json({
                    message: `Answer to question with id no: ${questionId}`,
                    data: answeredQuestionById
                });
            }
        };
    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error}`
        });
    };
};

export const updateAnswer = async (req:Request, res: Response) => {
    const {answerId} = req.params;
    try {
        const {body, authorId} = req.body;

        type AnswerTrait = {
            body: string;
            authorId: number;
        }

        const updateData: AnswerTrait = {
            body,
            authorId
        };

        const answer = await Answer.findByPk(answerId);
        if (!answer) {
            res.status(404).json({
                message: `Answer not found`
            })
        } else {
            const updatedAnswer = await Answer.update(updateData, {where: {id: answerId}});
            if (updatedAnswer[0] === 0) {
                res.status(404).json({
                    message: `Answer not found`
                })
            } else {
                res.status(200).json({
                    message: `Answer with id no: ${answerId} updated successfully`,
                    data: updatedAnswer[0]
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error updating answer, ${error}`
        })
    }
};

export const deleteAnswer = async (req: Request, res: Response) {
    const {answerId} = req.params;
    try {
        const answer = await Answer.findByPk(answerId);
        if (!answer) {
            res.status(404).json({
                message: `Answer not found`
            })
        } else {
            await answer.destroy
            res.status(201).json({
                message: `Answer deleted successfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error deleting answer, ${error}`
        })
    }
}