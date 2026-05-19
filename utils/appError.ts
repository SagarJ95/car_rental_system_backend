class AppError extends Error {
    statusCode: number;
    status: boolean;
    errors?: any;
    isOperational: boolean;

    constructor(message: string, statusCode: number, errors?: any) {
        super(message)
        this.statusCode = statusCode
        this.status = false;

        var formattedErrors: any = {};
        if (errors) {
            // Convert errors to a format { field_name: "error_message" }
            errors.array().forEach((error: any) => {
                formattedErrors[error.path] = error.msg;
            });
        }
        this.errors = formattedErrors ? formattedErrors : [];

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;