"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const ApiErrors_1 = require("../helpers/ApiErrors");
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new ApiErrors_1.BadRequestError('Token não informado!');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new ApiErrors_1.BadRequestError('Token não informado!');
    }
    const admin = yield AdminRepository_1.default.getAdmin(token);
    if (!admin) {
        throw new ApiErrors_1.Unauthorized("Token inválido");
    }
    req.body.admin = admin;
    req.body.admin.token = token;
    next();
});
exports.authMiddleware = authMiddleware;
