import { Request, Response } from "express";
import Tag from "../models/tag";

export const createTag = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;

        type TagTrait = {
            name: string
        }
    
        const tagData: TagTrait = {
            name
        }
    
        const newTag = await Tag.create(tagData);
        if (!newTag) {
            res.status(400).json({
                message: `Bad Request`
            })
        } else {
            res.status(201).json({
                message: `New Tag Created`,
                data: newTag
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const getTag = async (req:Request, res: Response) => {
    const { tagId } = req.params;
    //Find the tag by the id
    const tag = await Tag.findByPk( tagId );
    if ( !tag ) {
        res.status(404).json({
            success: false,
            message: `Tag with id: ${tagId} not found`,
        })
    } else {
        res.status(200).json({
            message: `Tag with id: ${tagId}`,
            data: tag
        })
    }
};

export const getATag = async (req:Request, res: Response) => {
    const { tagId } = req.params;
    //Find the tag by the id
    const tag = await Tag.findByPk( tagId );
    if ( !tag ) {
        res.status(404).json({
            success: false,
            message: `Tag with id: ${tagId} not found`,
        })
    } else {
        res.status(200).json({
            message: `Tag with id: ${tagId}`,
            data: tag
        })
    }
};