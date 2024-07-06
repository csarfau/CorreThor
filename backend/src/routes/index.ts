import { Router } from "express";
import AdminController from "../controllers/AdminController";
import CorrectorController from "../controllers/CorrectorController";
import CorrectionController from "../controllers/CorrectionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { IAPIResponse } from "../interfaces/interfaces";

const router: Router = Router();

router.get("/", (req, res) => {
  const response: IAPIResponse<Object> = {
    data: { "ok": "true" },
    err: null,
  }
  res.status(200).json(response);
});

router.get("/admin", authMiddleware, AdminController.getAdmin);

router.get("/correctors", authMiddleware, CorrectorController.listCorrectors);
router.post("/correctors", authMiddleware, CorrectorController.createCorrector);
router.put("/correctors/:correctorId", authMiddleware, CorrectorController.updateCorrector);
router.delete("/correctors/:correctorId", authMiddleware, CorrectorController.deleteCorrector);

router.get("/corrections/:correctorId", authMiddleware, CorrectionController.listCorrectionsByCorrectorId);
router.post("/corrections", authMiddleware, CorrectionController.createCorrection);
router.put("/corrections/:correctionId", authMiddleware, CorrectionController.updateCorrection);
router.delete("/corrections/:correctionId", authMiddleware, CorrectionController.deleteCorrection);

export default router;