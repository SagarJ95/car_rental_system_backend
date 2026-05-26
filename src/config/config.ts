import dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });

export default {
  development: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    dialect: "postgres" as const,
    timezone: "Asia/Kolkata",
    logging: false,
  },
  test: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    dialect: "postgres" as const,
    timezone: "Asia/Kolkata",
  },
  production: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    dialect: "postgres" as const,
    timezone: "Asia/Kolkata",
  },
};
