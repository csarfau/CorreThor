import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => res.json("Rota all desprotegida"));
router.get("/admin", (req, res) => res.json("Rota getadmin protegida"));

router.get("/correctors", (req, res) => res.json("Rota get correctors protegida"));
router.post("/correctors", (req, res) => res.json("Rota post correctors protegida"));
router.put("/correctors/:correctorId", (req, res) => res.json("Rota put correctors protegida"));
router.delete("/correctors/:correctorId", (req, res) => res.json("Rota delete correctors protegida"));

router.get("/corrections/:correctorId ", (req, res) => res.json("Rota get corrections protegida"));
router.post("/corrections", (req, res) => res.json("Rota post corrections protegida"));
router.put("/corrections/:correctionId", (req, res) => res.json("Rota put corrections protegida"));
router.delete("/corrections/:correctionId", (req, res) => res.json("Rota delete corrections protegida"));

export default router;