declare class AppError extends Error {
    statusCode: number;
    status: boolean;
    errors?: any;
    isOperational: boolean;
    constructor(message: string, statusCode: number, errors?: any);
}
export default AppError;
//# sourceMappingURL=appError.d.ts.map