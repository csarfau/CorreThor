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
const CorrectorService_1 = __importDefault(require("../services/CorrectorService"));
const ApiErrors_1 = require("../helpers/ApiErrors");
class default_1 {
    static listCorrectors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correctors = yield CorrectorService_1.default.listCorrectors();
            const response = {
                err: null,
                data: correctors
            };
            return res.status(200).json(correctors);
        });
    }
    static createCorrector(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            if (name === "" || null) {
                throw new ApiErrors_1.BadRequestError("Nome do corretor não informado");
            }
            const newCorrector = yield CorrectorService_1.default.createCorrector(name);
            const response = {
                err: null,
                data: newCorrector
            };
            return res.status(201).json(response);
        });
    }
    static updateCorrector(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correctorId = Number(req.params.correctorId);
            if (isNaN(correctorId)) {
                throw new ApiErrors_1.BadRequestError("Corretor inválido");
            }
            const { name } = req.body;
            if (name === "" || null) {
                throw new ApiErrors_1.BadRequestError("Nome do corretor não informado");
            }
            const updatedCorrector = yield CorrectorService_1.default.updateCorrector(name, correctorId);
            const response = {
                err: null,
                data: updatedCorrector
            };
            return res.status(200).json(response);
        });
    }
    static deleteCorrector(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correctorId = Number(req.params.correctorId);
            if (isNaN(correctorId)) {
                throw new ApiErrors_1.BadRequestError("Corretor inválido");
            }
            const deletedCorrector = yield CorrectorService_1.default.deleteCorrector(correctorId);
            const response = {
                err: null,
                data: deletedCorrector
            };
            return res.status(200).json(response);
        });
    }
}
exports.default = default_1;
