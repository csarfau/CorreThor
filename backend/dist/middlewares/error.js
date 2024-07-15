"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    var _a;
    const statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    console.log(error);
    const message = error.statusCode ? error.message : "Internal Server Error";
    const response = {
        data: null,
        err: { message: message }
    };
    return res.status(statusCode).json(response);
};
exports.errorMiddleware = errorMiddleware;
