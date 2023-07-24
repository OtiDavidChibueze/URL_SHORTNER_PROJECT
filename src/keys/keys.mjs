// DOT ENV
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE
const SECRET = process.env.SECRET

export {
    PORT,
    DATABASE,
    SECRET
}
