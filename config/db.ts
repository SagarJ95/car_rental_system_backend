import pkg from 'pg';
const { Pool: pool } = pkg
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

const dbConfig = {
    user: process.env.DB_USER as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
};

const db = new pool(dbConfig);

export default db;
