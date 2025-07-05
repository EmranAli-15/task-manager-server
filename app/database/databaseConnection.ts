import { MongoClient, Db } from "mongodb";

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

let DB: Db;
export const DBConnection = async () => {
    try {
        await client.connect();
        DB = client.db("boibihongo");
        console.log("🚀 Database connected!");
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