import express from 'express';
import { DBConnection, getDb } from './database/databaseConnection';
const app = express();
const port = 5000;

app.listen(port, () => {
    console.log("server is running on port " + port);
    DBConnection();
});

app.get("/user", async (req, res) => {
    const StudentCollection = getDb().collection("students");
    const students = await StudentCollection.find().toArray();
    res.send(students);
    return
})

app.get("/", (req, res) => {
    res.send("Hello World");
})