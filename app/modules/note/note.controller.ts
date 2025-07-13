import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleAsync } from "../../utils/handleAsync";
import { client, NoteCollection, UserCollection } from "../../database/databaseConnection";

const createNote = handleAsync(async (req: Request, res: Response) => {
    const { userId, categoryId } = req.body;
    const body = {
        ...req.body,
        userId: new ObjectId(req.body.userId as string),
        categoryId: new ObjectId(req.body.categoryId as string)
    };

    const session = client.startSession();
    let note;

    try {
        await session.withTransaction(async () => {
            // Operation 1 -> insert the note into the note collection
            note = await NoteCollection.insertOne(body, { session });


            // Operation 2 -> update the user category
            const updateResult = await UserCollection.updateOne(
                { _id: new ObjectId(userId as string) },
                { $addToSet: { categories: new ObjectId(categoryId as string) } },
                { session }
            );

            if (updateResult.matchedCount === 0) {
                throw new AppError(404, "User not found.");
            }
        });
    }
    catch (error) {
        throw new AppError(500, "Transaction failed.")
    }
    finally {
        await session.endSession();
        res.status(200).json({
            message: 'Note created.',
            data: note
        });
    }
})

const getNotes = handleAsync(async (req: Request, res: Response) => {
    const { userId, categoryId } = req.body;

    const result = await NoteCollection.find({ userId: new ObjectId(userId as string), categoryId: new ObjectId(categoryId as string) }).toArray();

    res.status(200).json({
        message: 'Notes retrieved.',
        data: result
    });
})

const updateNote = handleAsync(async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const { categoryId, userId } = req.body;

    const body = {
        ...req.body,
        userId: new ObjectId(req.body.userId as string),
        categoryId: new ObjectId(req.body.categoryId as string)
    };

    let note;


    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            // Operation 1 -> update note data
            note = await NoteCollection.updateOne(
                { _id: new ObjectId(noteId) },
                { $set: body },
                { session }
            );

            // Operation 2 -> update categories in a user
            await UserCollection.updateOne(
                { _id: new ObjectId(userId as string) },
                { $addToSet: { categories: new ObjectId(categoryId as string) } },
                { session }
            )
        })
    }
    catch (error) {
        throw new AppError(500, "Transaction failed.")
    }
    finally {
        await session.endSession();
        res.status(200).json({
            message: 'Note updated.',
            data: note
        });
    }
})

const getSingleNote = handleAsync(async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const result = await NoteCollection.findOne({ _id: new ObjectId(noteId) });
    if (!result) {
        throw new AppError(404, "Note not found.");
    };

    res.status(200).json({
        message: 'Note retrieved.',
        data: result
    });
})

const deleteNote = handleAsync(async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const result = await NoteCollection.deleteOne({ _id: new ObjectId(noteId) });
    if (!result) {
        throw new AppError(404, "Note not found.");
    };

    res.status(200).json({
        message: 'Note deleted.',
        data: result
    });
})

const userNotes = handleAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserCollection.aggregate([
        { $match: { _id: new ObjectId(userId) } },
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
        throw new AppError(404, "User not found.");
    };

    res.status(200).json({
        message: 'Notes retrieved.',
        data: result
    });
})

export const noteController = {
    createNote,
    updateNote,
    getNotes,
    getSingleNote,
    deleteNote,
    userNotes
}