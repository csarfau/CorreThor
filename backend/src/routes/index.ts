import { Router } from "express";
import AdminController from "../controllers/adminController";
import CorrectorController from "../controllers/correctorController";
import CorrectionController from "../controllers/correctionController";

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