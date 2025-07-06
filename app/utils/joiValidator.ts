import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const JoiValidator = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { errors: { wrap: { label: "" } } });

        if (error) {
            return next(error);
        }

        next();
    };
};
