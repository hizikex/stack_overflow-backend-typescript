import { Request, Response } from "express";
import Question from "../models/question";
import Tag from "../models/tag";
import { getAttributes } from "sequelize-typescript";

export const createQuestion = async (req:Request, res: Response) => {
    const tagId = req.params.tagId;
    try {
        const { title, body, authorId} = req.body;

        type QuestionTrait = {
            title: string;
            body: string;
            authorId: number;
            tagId?: number;
        }

        const questionData: QuestionTrait = {
            title,
            body,
            authorId,
            tagId: Number(tagId)
        };

        const tagObj = await Tag.findByPk(tagId);
        if (tagObj) {
            const createdQuestion = await Question.create(questionData)
            if (!createQuestion) {
                res.status(400).json({
                    message: `Bad Request`
                })
            }
            res.status(200).json({
                message: "Question created successfully",
                question: createdQuestion,
              });
        } else {
            res.status(404).json({
                message: "Tag not found",
              });
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const getQuestion = async (req:Request, res:Response) => {
    try {
        const { questionId } = req.params;

        //Find the question by the id
        const question = await Question.findByPk(questionId, {attributes: ['title', 'authorId', 'tagId']});
        if (!question) {
            res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        } else {
            res.status(200).json({
                message: `Displaying question with id: ${questionId}`,
                data: question
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving question ${error}`
        });
    }
};

export const getAllQuestions = async (req:Request, res: Response) => {
    try {
        const allQuestions = await Question.findAll();
        console.log(allQuestions);
        
        if (!allQuestions) {
            res.status(404).json({
                success: false,
                message: `Cannot find any question`
            });
        } else {
            res.status(200).json({
                message: `Available Questions are ${allQuestions.length}`,
                data: allQuestions
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving question ${error}`
        });
    }
};

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const {questionId} = req.params;
        const deletedQuestion = await Question.destroy({where: {id: questionId}})
        if (!deletedQuestion) {
            res.status(404).json({
                success: false,
                message: `Question with id: ${questionId} not found`
            });
        } else {
            res.status(200).json({
                message: `Question with id: ${questionId} is successfully deleted`
            });
        }
    } catch (error) {
        res.status(500).json({
            message:`Server error, ${error}`
        });
    }
};

export const updateQuestion = async (req:Request, res: Response) => {
    try {
        const {questionId} = req.params;
        const {title, body, authorId, tagId} = req.body;

        let viewsData = {
            edit: true,
            pageTitle: 'Edit Question'
        };

        type QuestionTrait = {
            //All traits here are optional to allow partial update
            title?: string;
            body?: string;
            authorId?: number;
            tagId?: number;
        };

        const questionData: QuestionTrait = {
            title,
            body,
            authorId,
            tagId: Number(tagId)
        };

        const updatedQuestion = await Question.update(questionData, {
            where: {
                id: questionId
            }
        });

        if (updatedQuestion[0] === 0) {
            res.status(404).json({
                message: `Question Not Found`
            });
        } else {
            res.status(201).json({
                message: `Question updated successfully`,
                data: updatedQuestion[0]
            });
        }
    } catch (error) {
        res.status(500).json({
            meessage: `Internal Server Error, ${error}`
        });
    }
};