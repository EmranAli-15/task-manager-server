"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const appError_1 = require("./appError");
const globalError = (err, req, res, next) => {
    let status = 500;
    let message = "Server Failure.";
    if (err instanceof appError_1.AppError) {
        status = err.statusCode;
        message = err.message;
    }
    if (err.isJoi) {
        status = 400;
        message = err.details[0].message;
    }
    return res.status(status).json({
        status,
        message
    });
};
exports.globalError = globalError;
