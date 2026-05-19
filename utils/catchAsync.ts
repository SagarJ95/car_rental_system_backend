import type { Request, Response } from "express";
const catchAsync = (fun: any) => {
    const errorHandler = (req: Request, res: Response, next: any) => {
        fun(req, res, next).catch(next);
    }

    return errorHandler;
}

export default catchAsync;