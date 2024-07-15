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
const AdminService_1 = __importDefault(require("../services/AdminService"));
class default_1 {
    static getAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.admin.token;
            if (token) {
                const admin = yield AdminService_1.default.getAdmin(token);
                const response = {
                    err: null,
                    data: admin,
                };
                return res.status(200).json(response);
            }
        });
    }
}
exports.default = default_1;
