import { Router} from "express";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { createPreference, getPaySuccess } from "../controllers/mercadoPago";



const router = Router()

router.post(
  "/create-preference",
  [
    validarJWT,
    isVerified,
  ],
  createPreference
)

router.post(
  "/pay-success",
  getPaySuccess,
)

// router.post(
//   "/pay-failure",
//   getPayFailure,
// )

// router.post(
//   "/pay-pending",
//   getPayPending,
// )


router



export default router;