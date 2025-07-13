import express from "express";
import { JoiValidator } from "../../utils/joiValidator";
import { noteValidation } from "./note.validation";
import { noteController } from "./note.controller";
const route = express.Router();

route.post("/createNote", JoiValidator(noteValidation.createNote), noteController.createNote);
route.patch("/updateNote/:noteId", JoiValidator(noteValidation.updateNote), noteController.updateNote);
route.get("/getNotes", noteController.getNotes);
route.get("/getSingleNote/:noteId", noteController.getSingleNote);
route.delete("/deleteNote/:noteId", noteController.deleteNote);
route.get("/userNotes/:userId", noteController.userNotes);


export const noteRoute = route;