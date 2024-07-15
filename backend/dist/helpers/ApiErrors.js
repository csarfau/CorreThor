"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflict = exports.NotFound = exports.Unauthorized = exports.BadRequestError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class Unauthorized extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
class NotFound extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFound = NotFound;
class Conflict extends ApiError {
    constructor(message) {
        super(message, 409);
    }
}
exports.Conflict = Conflict;
