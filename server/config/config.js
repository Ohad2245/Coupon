const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_CONNECTION = process.env.MONGO_URI;
const AUTH = process.env.AUTH_TOKEN;
const expiresIn = "115h";


module.exports = {
    PORT,
    DB_CONNECTION,
    AUTH,
    expiresIn
}
