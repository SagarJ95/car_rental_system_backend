import type { Request, Response } from "express";
declare const globalErrorHandler: (err: any, req: Request, res: Response, next: any) => void | Response<any, Record<string, any>>;
export default globalErrorHandler;
//# sourceMappingURL=errorController.d.ts.map