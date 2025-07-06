import express from 'express';
import { DBConnection, getDb } from './database/databaseConnection';
import { noteRoute } from './modules/note/note.route';
import { globalError } from './error/globalError';
const app = express();
app.use(express.json());
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


app.use("/api", noteRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use(globalError)