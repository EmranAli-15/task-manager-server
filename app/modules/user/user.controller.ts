import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { TUser } from "./user.interface";
import { UserCollection } from "../../database/databaseConnection";
import { AppError } from "../../error/appError";
import { hashGenerate, hashMatch } from "../../utils/hashGenerate";
import { createAccessToken } from "../../utils/createAccessToken";

const createUser = handleAsync(async (req: Request, res: Response) => {
    const userInfo: TUser = req.body;
    const userEmail = userInfo.email;
    const userPass = userInfo.password;
    const userConPass = userInfo.confirmPassword;

    if (userPass !== userConPass) {
        throw new AppError(400, "password not matched.");
    }

    const isUserExist = await UserCollection.findOne({ email: userEmail });

    if (isUserExist) {
        throw new AppError(409, "The user already exist.");
    }

    const hashPass = await hashGenerate(userPass);

    const userObj = {
        name: userInfo.name,
        email: userInfo.email,
        password: hashPass,
    }
    const result = await UserCollection.insertOne(userObj);

    const token = createAccessToken({ email: userInfo.email, id: result.insertedId.toString() });

    res.status(201).json({
        message: 'User created.',
        data: token
    });
});

const loginUser = handleAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userDoc = await UserCollection.findOne({ email });
    if (!userDoc) {
        throw new AppError(404, "User not found.")
    }

    const isUserExist = userDoc as unknown as TUser;
    const isPasswordMatch = await hashMatch(password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new AppError(403, "Password incorrect.")
    }

    const token = createAccessToken({ email: isUserExist.email, id: userDoc._id });
    res.status(200).json({
        message: 'Logged in successful.',
        data: {
            token,
            user: {
                name: userDoc?.name,
                id: userDoc?._id
            }
        }
    })
})

export const userController = {
    createUser,
    loginUser
}