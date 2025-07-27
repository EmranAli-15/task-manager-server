"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
    }
}
exports.AppError = AppError;
