import { MongoClient, Db, Collection } from "mongodb";
import envFile from "../envFile/envFile";

const uri = `mongodb+srv://${envFile.db_name}:${envFile.db_pass}@cluster0.2b4mnlf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(uri);

let DB: Db;

// Collections------------Collections------------
let NoteCollection: Collection;
let UserCollection: Collection;
// Collections------------Collections------------

export const DBConnection = async () => {
    try {
        await client.connect();
        DB = client.db(`${envFile.db_name}`);
        // DB = client.db("taskManager");
        console.log("🚀 Database connected!");

        // Collections------------Collections------------
        NoteCollection = DB.collection("note");
        UserCollection = DB.collection("user");
        // Collections------------Collections------------

    } catch (error) {
        console.log("❌ Database connection failed!");
        process.exit(1);
    }
}

export const getDb = () => {
    if (!DB) {
        console.log("Database not connected. Please connect database first!");
    }
    return DB;
};

export {
    NoteCollection,
    UserCollection
}