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
exports.hashMatch = exports.hashGenerate = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const envFile_1 = __importDefault(require("../envFile/envFile"));
const hashGenerate = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(password, Number(envFile_1.default.salt_round));
    return hash;
});
exports.hashGenerate = hashGenerate;
const hashMatch = (plainPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const compered = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    return compered;
});
exports.hashMatch = hashMatch;
