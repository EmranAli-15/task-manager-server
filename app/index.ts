import express from 'express';
import cors from 'cors';
import { noteRoute } from './modules/note/note.route';
import { globalError } from './error/globalError';
import { userRoute } from './modules/user/user.route';

export const app = express();
app.use(cors());
app.use(express.json());


// ROUTES------------------------------------
app.use("/api", noteRoute);
app.use("/api", userRoute);
// ROUTES------------------------------------


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use(globalError);