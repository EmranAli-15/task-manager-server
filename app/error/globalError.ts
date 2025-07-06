import { ErrorRequestHandler, NextFunction } from "express";
import { AppError } from "./appError";

export const globalError: ErrorRequestHandler = (err: any, req: any, res: any, next: NextFunction) => {
    let status: number = 500;
    let message: string = "Server Failure.";

    if (err instanceof AppError) {
        status = err.statusCode;
        message = err.message;
    }

    if (err.isJoi) {
        status = 400;
        message = err.details[0].message;
    }


    return res.status(500).json({
        status,
        message
    });
}