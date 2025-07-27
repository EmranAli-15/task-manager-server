"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const handleAsync_1 = require("../../utils/handleAsync");
const databaseConnection_1 = require("../../database/databaseConnection");
const appError_1 = require("../../error/appError");
const hashGenerate_1 = require("../../utils/hashGenerate");
const createAccessToken_1 = require("../../utils/createAccessToken");
const createUser = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    const userEmail = userInfo.email;
    const userPass = userInfo.password;
    const userConPass = userInfo.confirmPassword;
    if (userPass !== userConPass) {
        throw new appError_1.AppError(400, "password not matched.");
    }
    const isUserExist = yield databaseConnection_1.UserCollection.findOne({ email: userEmail });
    if (isUserExist) {
        throw new appError_1.AppError(409, "The user already exist.");
    }
    const hashPass = yield (0, hashGenerate_1.hashGenerate)(userPass);
    const userObj = {
        name: userInfo.name,
        email: userInfo.email,
        password: hashPass,
    };
    const result = yield databaseConnection_1.UserCollection.insertOne(userObj);
    const token = (0, createAccessToken_1.createAccessToken)({ email: userInfo.email, id: result.insertedId.toString() });
    res.status(201).json({
        message: 'User created.',
        data: token
    });
}));
const loginUser = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userDoc = yield databaseConnection_1.UserCollection.findOne({ email });
    if (!userDoc) {
        throw new appError_1.AppError(404, "User not found.");
    }
    const isUserExist = userDoc;
    const isPasswordMatch = yield (0, hashGenerate_1.hashMatch)(password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new appError_1.AppError(403, "Password incorrect.");
    }
    const token = (0, createAccessToken_1.createAccessToken)({ email: isUserExist.email, id: userDoc._id });
    res.status(200).json({
        message: 'Logged in successful.',
        data: {
            token,
            user: {
                name: userDoc === null || userDoc === void 0 ? void 0 : userDoc.name,
                id: userDoc === null || userDoc === void 0 ? void 0 : userDoc._id
            }
        }
    });
}));
exports.userController = {
    createUser,
    loginUser
};
