import express from "express";
import { JoiValidator } from "../../utils/joiValidator";
import { noteValidation } from "./note.validation";
import { noteController } from "./note.controller";
const route = express.Router();

route.post("/createNote", JoiValidator(noteValidation.createNote), noteController.createNote);
route.patch("/updateNote/:noteId", JoiValidator(noteValidation.updateNote), noteController.updateNote);
route.get("/getNotes", noteController.getNotes);


export const noteRoute = route;