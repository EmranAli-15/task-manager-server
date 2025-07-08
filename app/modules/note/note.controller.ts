import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { NoteCollection } from "../../database/databaseConnection";

const createNote = handleAsync(async (req: Request, res: Response) => {
    const result = await NoteCollection.insertOne(req.body);

    res.status(201).json({
        message: 'Note created.',
        data: result
    });
});

const getNotes = handleAsync(async (req: Request, res: Response) => {
    const result = await NoteCollection.find().toArray();

    res.status(200).json({
        message: 'Notes retrieved.',
        data: result
    });
})


export const noteController = {
    createNote,
    getNotes
}