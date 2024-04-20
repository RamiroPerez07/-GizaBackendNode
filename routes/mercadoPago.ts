import { Router} from "express";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { createPreference, notifyPayment } from "../controllers/mercadoPago";



const router = Router()

router.post(
  "/create-preference",
  [
    validarJWT,
    isVerified,
  ],
  createPreference
)

router.get(
  "/notify",
  notifyPayment
)

router



export default router;