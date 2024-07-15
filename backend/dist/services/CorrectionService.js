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
const ApiErrors_1 = require("../helpers/ApiErrors");
const CorrectionRepository_1 = __importDefault(require("../repositories/CorrectionRepository"));
class default_1 {
    static listCorrectionsByCorrectorId(correctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const corrections = yield CorrectionRepository_1.default.listCorrectionsByCorrectorId(correctorId);
            return corrections;
        });
    }
    static createCorrection(correctorId, className, module, meeting, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCorrection = yield CorrectionRepository_1.default.createCorrection(correctorId, className, module, meeting, student);
            return newCorrection;
        });
    }
    static updateCorrection(correctionId, correctorId, className, module, meeting, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCorrection = yield CorrectionRepository_1.default.findCorrectionById(correctionId);
            if (existingCorrection === undefined) {
                throw new ApiErrors_1.BadRequestError("Correção não encontrada!");
            }
            if (existingCorrection.corrector_id !== correctorId) {
                throw new ApiErrors_1.BadRequestError("Corretor não pode ser alterado!");
            }
            const updatedCorrection = yield CorrectionRepository_1.default.updateCorrection(correctionId, correctorId, className, module, meeting, student);
            console.log(updatedCorrection);
            return updatedCorrection;
        });
    }
    static deleteCorrection(correctionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCorrection = yield CorrectionRepository_1.default.deleteCorrection(correctionId);
            if (deletedCorrection === undefined) {
                throw new ApiErrors_1.NotFound("Correção não encontrada!");
            }
            return deletedCorrection;
        });
    }
}
exports.default = default_1;
