import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: "HS256",
    });
};
const verfiyToken = async (req, res, next) => {
    try {
        let token = "";
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            throw new Error("Please Provide Token");
        }
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(userInfo);
        req.user = userInfo;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: err.message,
        });
    }
};
export { generateToken, verfiyToken };
//# sourceMappingURL=jwtTokenWeb.js.map