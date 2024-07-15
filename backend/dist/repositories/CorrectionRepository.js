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
const connection_1 = __importDefault(require("../database/connection"));
class default_1 {
    static listCorrectionsByCorrectorId(correctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM correction WHERE corrector_id = $1";
            const { rows } = yield connection_1.default.query(query, [correctorId]);
            return rows;
        });
    }
    static createCorrection(correctorId, className, module, meeting, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO correction (corrector_id, class, module, meeting, student) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const { rows } = yield connection_1.default.query(query, [
                correctorId,
                className,
                module,
                meeting,
                student,
            ]);
            return rows[0];
        });
    }
    static updateCorrection(correctionId, correctorId, className, module, meeting, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE correction SET corrector_id = $1, "class" = $2, module = $3, 
    meeting = $4, student = $5 WHERE id = $6 RETURNING *`;
            const { rows } = yield connection_1.default.query(query, [
                correctorId,
                className,
                module,
                meeting,
                student,
                correctionId
            ]);
            return rows[0];
        });
    }
    static deleteCorrection(correctionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM correction WHERE id = $1 RETURNING *`;
            const { rows } = yield connection_1.default.query(query, [correctionId]);
            return rows[0];
        });
    }
    static findCorrectionById(correctionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM correction WHERE id = $1`;
            const { rows } = yield connection_1.default.query(query, [correctionId]);
            return rows[0];
        });
    }
}
exports.default = default_1;
