import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    salt_round: process.env.salt_round,
    access_token: process.env.access_token,
}