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
const CorrectionService_1 = __importDefault(require("../services/CorrectionService"));
const ApiErrors_1 = require("../helpers/ApiErrors");
class default_1 {
    static listCorrectionsByCorrectorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correctorId = Number(req.params.correctorId);
            if (isNaN(correctorId)) {
                throw new ApiErrors_1.BadRequestError("Corretor inválido");
            }
            const corrections = yield CorrectionService_1.default.listCorrectionsByCorrectorId(correctorId);
            const response = {
                err: null,
                data: corrections
            };
            return res.status(200).json(response);
        });
    }
    static createCorrection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correctorId, className, module, meeting, student } = req.body;
            console.log(req.body);
            if (correctorId === "" || null) {
                throw new ApiErrors_1.BadRequestError("Corretor não informado");
            }
            if (className === "" || null) {
                throw new ApiErrors_1.BadRequestError("Turma não informada");
            }
            if (module === "" || null) {
                throw new ApiErrors_1.BadRequestError("Módulo não informado");
            }
            if (meeting === "" || null) {
                throw new ApiErrors_1.BadRequestError("Aula não informada");
            }
            if (student === "" || null) {
                throw new ApiErrors_1.BadRequestError("Aluno não informado");
            }
            const newCorrection = yield CorrectionService_1.default.createCorrection(correctorId, className, module, meeting, student);
            const response = {
                err: null,
                data: newCorrection
            };
            return res.status(201).json(response);
        });
    }
    static updateCorrection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correctionId = Number(req.params.correctionId);
            if (isNaN(correctionId)) {
                throw new ApiErrors_1.BadRequestError("Corretor inválido");
            }
            const { correctorId, className, module, meeting, student } = req.body;
            if (correctorId === "" || null) {
                throw new ApiErrors_1.BadRequestError("Corretor não informado");
            }
            if (className === "" || null) {
                throw new ApiErrors_1.BadRequestError("Turma não informada");
            }
            if (module === "" || null) {
                throw new ApiErrors_1.BadRequestError("Módulo não informado");
            }
            if (meeting === "" || null) {
                throw new ApiErrors_1.BadRequestError("Aula não informada");
            }
            if (student === "" || null) {
                throw new ApiErrors_1.BadRequestError("Aluno não informado");
            }
            const updatedCorrection = yield CorrectionService_1.default.updateCorrection(correctionId, correctorId, className, module, meeting, student);
            const response = {
                err: null,
                data: updatedCorrection
            };
            return res.status(200).json(response);
        });
    }
    static deleteCorrection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correctionId = Number(req.params.correctionId);
            if (isNaN(correctionId)) {
                throw new ApiErrors_1.BadRequestError("Correção inválida!");
            }
            const deletedCorrection = yield CorrectionService_1.default.deleteCorrection(correctionId);
            const response = {
                err: null,
                data: deletedCorrection
            };
            res.status(200).json(response);
        });
    }
}
exports.default = default_1;
