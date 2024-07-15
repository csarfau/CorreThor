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
    static listCorrectors() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM corrector`;
            const { rows } = yield connection_1.default.query(query);
            return rows;
        });
    }
    static createCorrector(correctorName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO corrector (name) VALUES ($1) RETURNING *`;
            const { rows } = yield connection_1.default.query(query, [correctorName]);
            return rows[0];
        });
    }
    static updateCorrector(correctorName, correctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE corrector SET name = $1 WHERE id = $2 RETURNING *`;
            const { rows } = yield connection_1.default.query(query, [correctorName, correctorId]);
            return rows[0];
        });
    }
    static deleteCorrector(correctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM corrector WHERE id = $1 RETURNING *`;
            const { rows } = yield connection_1.default.query(query, [correctorId]);
            return rows[0];
        });
    }
    static findCorrectorByName(correctorName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM corrector WHERE name = $1`;
            const { rows } = yield connection_1.default.query(query, [correctorName]);
            return rows[0];
        });
    }
}
exports.default = default_1;
