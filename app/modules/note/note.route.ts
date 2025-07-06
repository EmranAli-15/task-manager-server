import express from "express";
import { JoiValidator } from "../../utils/joiValidator";
import { noteValidation } from "./note.validation";
import { createNote, getNote } from "../../utils/handleAsync";
const route = express.Router();

route.post("/createNote", JoiValidator(noteValidation.createNote), createNote)
route.get("/getNote", getNote)


export const noteRoute = route;