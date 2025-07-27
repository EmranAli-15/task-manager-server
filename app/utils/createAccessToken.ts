import jwt from 'jsonwebtoken';
import envFile from '../envFile/envFile';
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (jwtPayload: any) => {
    return jwt.sign(
        jwtPayload,
        envFile.access_token as string,
        {
            expiresIn: "30 days"
        }
    )
};