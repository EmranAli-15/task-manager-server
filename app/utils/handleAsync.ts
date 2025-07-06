import { NextFunction, Request, Response } from "express";
import { getDb } from "../database/databaseConnection";

export const handleAsync = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export const getNote = handleAsync(async (req: Request, res: Response) => {
    const StudentCollection = getDb().collection("students");
    const students = await StudentCollection.find().toArray();
    res.send(students);
    return
})

export const createNote = (req: Request, res: Response) => {
    res.send("yeaaahoo!!");
}