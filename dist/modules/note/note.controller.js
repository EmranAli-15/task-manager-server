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
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteController = void 0;
const mongodb_1 = require("mongodb");
const appError_1 = require("../../error/appError");
const handleAsync_1 = require("../../utils/handleAsync");
const databaseConnection_1 = require("../../database/databaseConnection");
const createNote = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, categoryId } = req.body;
    const body = Object.assign(Object.assign({}, req.body), { userId: new mongodb_1.ObjectId(req.body.userId), categoryId: new mongodb_1.ObjectId(req.body.categoryId) });
    const session = databaseConnection_1.client.startSession();
    let note;
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // Operation 1 -> insert the note into the note collection
            note = yield databaseConnection_1.NoteCollection.insertOne(body, { session });
            // Operation 2 -> update the user category
            const updateResult = yield databaseConnection_1.UserCollection.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $addToSet: { categories: new mongodb_1.ObjectId(categoryId) } }, { session });
            if (updateResult.matchedCount === 0) {
                throw new appError_1.AppError(404, "User not found.");
            }
        }));
    }
    catch (error) {
        throw new appError_1.AppError(500, "Transaction failed.");
    }
    finally {
        yield session.endSession();
        res.status(200).json({
            message: 'Note created.',
            data: note
        });
    }
}));
const getNotes = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, categoryId } = req.body;
    const result = yield databaseConnection_1.NoteCollection.find({ userId: new mongodb_1.ObjectId(userId), categoryId: new mongodb_1.ObjectId(categoryId) }).toArray();
    res.status(200).json({
        message: 'Notes retrieved.',
        data: result
    });
}));
const updateNote = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const { categoryId, userId } = req.body;
    const body = Object.assign(Object.assign({}, req.body), { userId: new mongodb_1.ObjectId(req.body.userId), categoryId: new mongodb_1.ObjectId(req.body.categoryId) });
    let note;
    const session = databaseConnection_1.client.startSession();
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // Operation 1 -> update note data
            note = yield databaseConnection_1.NoteCollection.updateOne({ _id: new mongodb_1.ObjectId(noteId) }, { $set: body }, { session });
            // Operation 2 -> update categories in a user
            yield databaseConnection_1.UserCollection.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $addToSet: { categories: new mongodb_1.ObjectId(categoryId) } }, { session });
        }));
    }
    catch (error) {
        throw new appError_1.AppError(500, "Transaction failed.");
    }
    finally {
        yield session.endSession();
        res.status(200).json({
            message: 'Note updated.',
            data: note
        });
    }
}));
const getSingleNote = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const result = yield databaseConnection_1.NoteCollection.findOne({ _id: new mongodb_1.ObjectId(noteId) });
    if (!result) {
        throw new appError_1.AppError(404, "Note not found.");
    }
    ;
    res.status(200).json({
        message: 'Note retrieved.',
        data: result
    });
}));
const deleteNote = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const result = yield databaseConnection_1.NoteCollection.deleteOne({ _id: new mongodb_1.ObjectId(noteId) });
    if (!result) {
        throw new appError_1.AppError(404, "Note not found.");
    }
    ;
    res.status(200).json({
        message: 'Note deleted.',
        data: result
    });
}));
const userNotes = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield databaseConnection_1.UserCollection.aggregate([
        { $match: { _id: new mongodb_1.ObjectId(userId) } },
        {
            $lookup: {
                from: "category",
                localField: "categories",
                foreignField: "_id",
                as: "categories"
            }
        }
    ]).project({ password: 0 }).toArray();
    if (!result.length) {
        throw new appError_1.AppError(404, "User not found.");
    }
    ;
    res.status(200).json({
        message: 'Notes retrieved.',
        data: result[0]
    });
}));
exports.noteController = {
    createNote,
    updateNote,
    getNotes,
    getSingleNote,
    deleteNote,
    userNotes
};
