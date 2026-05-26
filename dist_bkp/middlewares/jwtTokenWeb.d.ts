import type { Request, Response, NextFunction } from "express";
declare const generateToken: (payload: object) => string;
declare const verfiyToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { generateToken, verfiyToken };
//# sourceMappingURL=jwtTokenWeb.d.ts.map