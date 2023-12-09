import dotenv from 'dotenv';
import program from "./commander.js";

/* 
const mode = program.opts().mode;
dotenv.config({
    path:
        mode === "dev"
        ? ".env.development"
        : mode === "test"
        ? ".env.testing"
        : ".env.production",
    });
*/


dotenv.config()

export default{
    port: program.opts().port,
    persistencia : program.opts().db,
    env_port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    mongo_session_secret: process.env.MONGO_SESSION_SECRET,
    filestore_session_secret: process.env.FILESTORE_SESSION_SECRET,
    ghithub_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
    baseURL: process.env.BASE_URL 
}