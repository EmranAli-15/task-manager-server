import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { TUser } from "./user.interface";
import { UserCollection } from "../../database/databaseConnection";
import { AppError } from "../../error/appError";
import { hashGenerate } from "../../utils/hashGenerate";

const createUser = handleAsync(async (req: Request, res: Response) => {
    const userInfo: TUser = req.body;
    const userEmail = userInfo.email;
    const userPass = userInfo.password;
    const userConPass = userInfo.confirmPassword;

    if (userPass !== userConPass) {
        throw new AppError(400, "password not matched.");
    }

    const isUserExist = await UserCollection.findOne({ email: userEmail });

    if (!isUserExist) {
        const hashPass = await hashGenerate(userPass);
        console.log(hashPass)
    }
    else res.send(isUserExist)

    res.send("working")
})

export const userController = {
    createUser
}