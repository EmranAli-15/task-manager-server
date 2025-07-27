"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envFile_1 = __importDefault(require("../envFile/envFile"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createAccessToken = (jwtPayload) => {
    return jsonwebtoken_1.default.sign(jwtPayload, envFile_1.default.access_token, {
        expiresIn: "30 days"
    });
};
exports.createAccessToken = createAccessToken;
