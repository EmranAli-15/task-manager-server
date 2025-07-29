"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createNote = joi_1.default.object({
    title: joi_1.default.string().empty(''),
    userId: joi_1.default.string().required(),
    categoryId: joi_1.default.string().required(),
    details: joi_1.default.string().empty(''),
    color: joi_1.default.object(),
    lists: joi_1.default.array().items(joi_1.default.string()),
    photos: joi_1.default.array().items(joi_1.default.string()),
});
const updateNote = joi_1.default.object({
    userId: joi_1.default.string().required(),
    categoryId: joi_1.default.string().required(),
    title: joi_1.default.string().empty(''),
    color: joi_1.default.object(),
    details: joi_1.default.string().empty(''),
    lists: joi_1.default.array().items(joi_1.default.string()),
    photos: joi_1.default.array().items(joi_1.default.string()),
});
exports.noteValidation = {
    createNote,
    updateNote
};
