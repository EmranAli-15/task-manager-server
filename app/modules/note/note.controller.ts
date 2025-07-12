import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { client, NoteCollection, UserCollection } from "../../database/databaseConnection";
import { ObjectId } from "mongodb";
import { AppError } from "../../error/appError";

const createNote = async (req: Request, res: Response) => {
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
                throw new Error("User not found.");
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
};

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