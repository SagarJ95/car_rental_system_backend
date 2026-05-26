import dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });
// CONSTANTS
const APP_URL = process.env.APP_URL || "http://localhost";
const PORT = process.env.APP_PORT || 4000;
const APP_NAME = process.env.APP_NAME || "Car Book";
// Framework
import express from "express";
const app = express();
import { join } from "path";
import pkg from "body-parser";
const { json: _json, urlencoded: _urlencoded } = pkg;
import session, { Store } from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
const SequelizeStore = connectSessionSequelize(Store);
import sequelize from "./config/database.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import cors from 'cors';
app.use("/uploads/export", express.static(path.join(process.cwd(), "public/uploads/export")));
// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors());
const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: "Sessions",
});
//sessionStore.sync();
import api from './routes/web.js';
import admin_api from './routes/admin_api.js';
import globalErrorHandler from "./controllers/errorController.js";
app.use(session({
    secret: process.env.SESSION_SECRET || "Jnsdf83452Njsdfbsdbf", // You should store this in .env
    resave: false, // Don't save the session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    store: new SequelizeStore({ db: sequelize }), // Store sessions in DB
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Prevents client-side JS from reading the cookie
    },
}));
app.use(_json());
app.use(_urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(_json());
app.use(_urlencoded({ extended: false }));
app.use('/api', api);
app.use('/admin_api', admin_api);
app.use(globalErrorHandler);
process.on("uncaughtException", (error) => {
    console.log("inn");
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("inn2");
});
// app.listen(PORT, () => {
//   console.log("Server Running on " + APP_URL + ":" + PORT);
// });
export default app;
//# sourceMappingURL=app.js.map