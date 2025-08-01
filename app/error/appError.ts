export class AppError extends Error {
    statusCode: number;
    constructor(status: number, message: string) {
        super(message);
        this.statusCode = status;
    }
}