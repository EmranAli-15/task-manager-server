"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const joiValidator_1 = require("../../utils/joiValidator");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.post("/createUser", (0, joiValidator_1.JoiValidator)(user_validation_1.userValidation.createUser), user_controller_1.userController.createUser);
route.post("/loginUser", user_controller_1.userController.loginUser);
exports.userRoute = route;
