"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchedResult_1 = require("../controllers/searchedResult");
const tag_1 = require("../controllers/tag");
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
Router.post('/newtag', tag_1.createTag);
Router.patch('/updatetags/:tagId', tag_1.updateTag);
Router.get('/tags/:tagId', tag_1.getTag);
Router.get('/tags', tag_1.getAllTag);
Router.get('/tags/search', searchedResult_1.searchTags);
Router.delete('/deletetags/:tagId', tag_1.deleteTag);
exports.default = Router;
