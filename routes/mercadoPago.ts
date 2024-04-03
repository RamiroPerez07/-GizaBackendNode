import { Router} from "express";

import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { createPreference } from "../controllers/mercadoPago";



const router = Router()

router.post(
  "/create-preference",
  [
    isVerified,
    validarJWT,
    recolectarErrores,
  ],
  createPreference
)



export default router;