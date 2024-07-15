"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = __importDefault(require("../controllers/AdminController"));
const CorrectorController_1 = __importDefault(require("../controllers/CorrectorController"));
const CorrectionController_1 = __importDefault(require("../controllers/CorrectionController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const delayMiddleware_1 = require("../middlewares/delayMiddleware");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const response = {
        data: { "ok": "true" },
        err: null,
    };
    res.status(200).json(response);
});
router.get("/admin", delayMiddleware_1.delay, authMiddleware_1.authMiddleware, AdminController_1.default.getAdmin);
router.get("/correctors", delayMiddleware_1.delay, authMiddleware_1.authMiddleware, CorrectorController_1.default.listCorrectors);
router.post("/correctors", authMiddleware_1.authMiddleware, CorrectorController_1.default.createCorrector);
router.put("/correctors/:correctorId", authMiddleware_1.authMiddleware, CorrectorController_1.default.updateCorrector);
router.delete("/correctors/:correctorId", authMiddleware_1.authMiddleware, CorrectorController_1.default.deleteCorrector);
router.get("/corrections/:correctorId", delayMiddleware_1.delay, authMiddleware_1.authMiddleware, CorrectionController_1.default.listCorrectionsByCorrectorId);
router.post("/corrections", authMiddleware_1.authMiddleware, CorrectionController_1.default.createCorrection);
router.put("/corrections/:correctionId", authMiddleware_1.authMiddleware, CorrectionController_1.default.updateCorrection);
router.delete("/corrections/:correctionId", authMiddleware_1.authMiddleware, CorrectionController_1.default.deleteCorrection);
exports.default = router;
