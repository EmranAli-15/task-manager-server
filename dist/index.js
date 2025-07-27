"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const databaseConnection_1 = require("./database/databaseConnection");
const note_route_1 = require("./modules/note/note.route");
const globalError_1 = require("./error/globalError");
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 5000;
//---------FOR LOCALHOST----------
// app.listen(port, () => {
//     console.log("server is running on port " + port);
//     DBConnection();
// });
//---------FOR VERCEL----------
(0, databaseConnection_1.DBConnection)();
// ROUTES------------------------------------
app.use("/api", note_route_1.noteRoute);
app.use("/api", user_route_1.userRoute);
// ROUTES------------------------------------
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(globalError_1.globalError);
exports.default = app;
