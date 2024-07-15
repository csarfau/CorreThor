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
const CorrectorRepository_1 = __importDefault(require("../repositories/CorrectorRepository"));
class default_1 {
    static listCorrectors() {
        return __awaiter(this, void 0, void 0, function* () {
            const correctors = yield CorrectorRepository_1.default.listCorrectors();
            return correctors;
        });
    }
    static createCorrector(correctorName) {
        return __awaiter(this, void 0, void 0, function* () {
            const duplicatedCorrector = yield CorrectorRepository_1.default.findCorrectorByName(correctorName);
            if (duplicatedCorrector) {
                throw new ApiErrors_1.Conflict("Já há um corretor com esse nome cadastrado");
            }
            const newCorrector = yield CorrectorRepository_1.default.createCorrector(correctorName);
            return newCorrector;
        });
    }
    static updateCorrector(correctorName, correctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const duplicatedCorrector = yield CorrectorRepository_1.default.findCorrectorByName(correctorName);
            if (duplicatedCorrector) {
                throw new ApiErrors_1.Conflict("Já há um corretor com esse nome cadastrado");
            }
            const updatedCorrector = yield CorrectorRepository_1.default.updateCorrector(correctorName, correctorId);
            return updatedCorrector;
        });
    }
    static deleteCorrector(correctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCorrector = yield CorrectorRepository_1.default.deleteCorrector(correctorId);
            if (deletedCorrector === undefined) {
                throw new ApiErrors_1.NotFound("Corretor não encontrado");
            }
            return deletedCorrector;
        });
    }
}
exports.default = default_1;
