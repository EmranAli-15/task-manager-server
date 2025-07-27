"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const note_route_1 = require("./modules/note/note.route");
const globalError_1 = require("./error/globalError");
const user_route_1 = require("./modules/user/user.route");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// ROUTES------------------------------------
exports.app.use("/api", note_route_1.noteRoute);
exports.app.use("/api", user_route_1.userRoute);
// ROUTES------------------------------------
exports.app.get("/", (req, res) => {
    res.send("Hello World");
});
exports.app.use(globalError_1.globalError);
