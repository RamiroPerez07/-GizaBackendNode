import { Router } from "express";
import { sendContactMail } from "../controllers/contact";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { check } from "express-validator";

const router = Router()

router.post("/", 
[
  check("contacto", "El contacto es obligatorio").not().isEmpty(),
  check("email", "El email es obligatorio").not().isEmpty(),
  check("telefono", "El telefono es obligatorio").not().isEmpty(),
  check("mensaje", "El mensaje es obligatorio").not().isEmpty(),
  recolectarErrores,
],
sendContactMail)

export default router