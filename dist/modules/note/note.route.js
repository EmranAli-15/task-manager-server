"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoute = void 0;
const express_1 = __importDefault(require("express"));
const joiValidator_1 = require("../../utils/joiValidator");
const note_validation_1 = require("./note.validation");
const note_controller_1 = require("./note.controller");
const route = express_1.default.Router();
route.post("/createNote", (0, joiValidator_1.JoiValidator)(note_validation_1.noteValidation.createNote), note_controller_1.noteController.createNote);
route.patch("/updateNote/:noteId", (0, joiValidator_1.JoiValidator)(note_validation_1.noteValidation.updateNote), note_controller_1.noteController.updateNote);
route.post("/getNotes", note_controller_1.noteController.getNotes);
route.get("/getSingleNote/:noteId", note_controller_1.noteController.getSingleNote);
route.delete("/deleteNote/:noteId", note_controller_1.noteController.deleteNote);
route.get("/userNotes/:userId", note_controller_1.noteController.userNotes);
exports.noteRoute = route;
