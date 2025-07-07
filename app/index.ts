import express from 'express';
import { DBConnection } from './database/databaseConnection';
import { noteRoute } from './modules/note/note.route';
import { globalError } from './error/globalError';
import { userRoute } from './modules/user/user.route';
const app = express();
app.use(express.json());
const port = 5000;

app.listen(port, () => {
    console.log("server is running on port " + port);
    DBConnection();
});


// ROUTES------------------------------------
app.use("/api", noteRoute);
app.use("/api", userRoute);
// ROUTES------------------------------------


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use(globalError)