import bcrypt from "bcrypt";
import envFile from "../envFile/envFile";

export const hashGenerate = async (password: string) => {
    const hash = await bcrypt.hash(password, Number(envFile.salt_round))
    return hash;
}

export const hashMatch = (plainPassword: string, hashedPassword: string) => {
    const compered = bcrypt.compare(plainPassword, hashedPassword);
}