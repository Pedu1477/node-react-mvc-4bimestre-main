import express from "express";
import autenticar from "../middlewares/autenticar.js";
import {
  atualizarRelato,
  buscarRelato,
  cadastrarRelato,
  listarRelatos,
  removerRelato
} from "../controllers/relatosController.js";

const router = express.Router();

router.get("/", listarRelatos);
router.get("/:id", buscarRelato);
router.post("/", autenticar, cadastrarRelato);
router.patch("/:id", autenticar, atualizarRelato);
router.delete("/:id", autenticar, removerRelato);

export default router;
