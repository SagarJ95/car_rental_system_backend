import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";

dotenv.config({ path: `${process.cwd()}/.env` });

const generateToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "5m",
        algorithm: "HS256",
    });
};

const verfiyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        let token: string | undefined = "";

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new Error("Please Provide Token");
        }

        const userInfo = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string
        );

        (req as any).user = userInfo

        next();
    } catch (err: any) {
        res.status(401).json({
            message: err.message,
        });
    }
};

export {
    generateToken,
    verfiyToken
};