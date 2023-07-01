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

export const getAllTag = async (req:Request, res: Response) => {
    const tag = await Tag.findAll();
    if ( tag.length === 0 ) {
        res.status(404).json({
            success: false,
            message: `No tag found`,
        })
    } else {
        res.status(200).json({
            message: `ALL TAGS ARE: ${tag.length}`,
            data: tag
        })
    }
};

export const updateTag = async (req: Request, res: Response) => {
    const { tagId } = req.params;
    const {name} = req.body;

    type TagTrait = {
        name?: string;
    };

    const tagData: TagTrait = {
        name
    };
    const updatedTag = await Tag.update(tagData, {where: {
        id: tagId}
    });

    if (updatedTag[0] === 0) {
        res.status(404).json({
            message: `No Tag Found`
        })
    } else {
        res.status(201).json({
            message: `Tag Updated Successfully`,
            data: updatedTag
        })
    }
};

export const deleteTag = async (req: Request, res: Response) => {
    const { tagId } = req.params;
    const deletedTag = await Tag.destroy({where: {
        id: tagId
    }});

    if ( !tagId ) {
        res.status(404).json({
            status: false,
            message: `Tag with id: ${tagId} not found`
        })
    } else {
        res.status(200).json({
            message: `Tag with id: ${ tagId } is successfully deleted`,
            data: deletedTag
        })
    }
}