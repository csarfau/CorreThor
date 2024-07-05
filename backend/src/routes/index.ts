import { Router } from "express";
import AdminController from "../controllers/AdminController";
import CorrectorController from "../controllers/CorrectorController";
import CorrectionController from "../controllers/CorrectionController";

const router: Router = Router();

router.get("/", (req, res) => {"API Funcionando!"});
router.get("/admin", AdminController.getAdmin);

router.get("/correctors", CorrectorController.listCorrectors);
router.post("/correctors", CorrectorController.createCorrector);
router.put("/correctors/:correctorId", CorrectorController.updateCorrector);
router.delete("/correctors/:correctorId", CorrectorController.deleteCorrector);

router.get("/corrections/:correctorId", CorrectionController.listCorrectionsByCorrectorId);
router.post("/corrections", CorrectionController.createCorrection);
router.put("/corrections/:correctionId", CorrectionController.updateCorrection);
router.delete("/corrections/:correctionId", CorrectionController.deleteCorrection);

export default router;