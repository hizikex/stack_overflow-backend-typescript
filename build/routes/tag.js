"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../controllers/tag");
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
Router.post('/newtag', tag_1.createTag);
Router.get('/tag/:tagId', tag_1.getTag);
exports.default = Router;
