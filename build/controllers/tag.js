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
exports.getTag = exports.createTag = void 0;
const tag_1 = __importDefault(require("../models/tag"));
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const tagData = {
            name
        };
        const newTag = yield tag_1.default.create(tagData);
        if (!newTag) {
            res.status(400).json({
                message: `Bad Request`
            });
        }
        else {
            res.status(201).json({
                message: `New Tag Created`,
                data: newTag
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.createTag = createTag;
const getTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    //Find the tag by the id
    const tag = yield tag_1.default.findByPk(tagId);
    if (!tag) {
        res.status(404).json({
            success: false,
            message: `Tag with id: ${tagId} not found`,
        });
    }
    else {
        res.status(200).json({
            message: `Tag with id: ${tagId}`,
            data: tag
        });
    }
});
exports.getTag = getTag;
