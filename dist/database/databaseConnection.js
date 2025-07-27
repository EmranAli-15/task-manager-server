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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCollection = exports.NoteCollection = exports.getDb = exports.DBConnection = exports.client = void 0;
const mongodb_1 = require("mongodb");
const envFile_1 = __importDefault(require("../envFile/envFile"));
const uri = `mongodb+srv://${envFile_1.default.db_name}:${envFile_1.default.db_pass}@cluster0.2b4mnlf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb://127.0.0.1:27017";
exports.client = new mongodb_1.MongoClient(uri);
let DB;
// Collections------------Collections------------
let NoteCollection;
let UserCollection;
// Collections------------Collections------------
const DBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        DB = exports.client.db(`${envFile_1.default.db_name}`);
        // DB = client.db("taskManager");
        console.log("🚀 Database connected!");
        // Collections------------Collections------------
        exports.NoteCollection = NoteCollection = DB.collection("note");
        exports.UserCollection = UserCollection = DB.collection("user");
        // Collections------------Collections------------
    }
    catch (error) {
        console.log("❌ Database connection failed!");
        process.exit(1);
    }
});
exports.DBConnection = DBConnection;
const getDb = () => {
    if (!DB) {
        console.log("Database not connected. Please connect database first!");
    }
    return DB;
};
exports.getDb = getDb;
