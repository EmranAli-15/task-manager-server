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
const index_1 = require("./index");
const databaseConnection_1 = require("./database/databaseConnection");
const port = 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, databaseConnection_1.DBConnection)();
            index_1.app.listen(port, () => {
                console.log("server is running on port " + port);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
