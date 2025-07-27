"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidator = void 0;
const JoiValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { errors: { wrap: { label: "" } } });
        if (error) {
            return next(error);
        }
        next();
    };
};
exports.JoiValidator = JoiValidator;
