import { Router} from "express";
import { register, login, verifyUser, forgotPassword, getUserByTokenId, recoveryPassword } from "../controllers/auth";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
//import { existeEmail } from "../helpers/validacionesDB";
import { verificarMailUsuario } from "../middlewares/verificarMailUsuario";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";


const router = Router()

router.post(
  "/register",
  [
    check("usuarioNombre","El nombre de usuario es obligatorio").not().isEmpty(),
    check("usuarioNombre", "El nombre de usuario debe ser de 6 caracteres mínimo").isLength({min: 6}),
    check("email","El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres mínimo").isLength({min: 6}),
    verificarMailUsuario,
    //check("email").custom(existeEmail),
    recolectarErrores
  ],
  register
)

router.post(
  "/login",
  [
    check("email","El mail es obligatorio").not().isEmpty(),
    check("email", "El mail no es válido").isEmail(),
    check("password","La contraseña es obligatoria").not().isEmpty(),
    check("password", "El password debe ser de 6 caracteres minimo").isLength({min: 6}),
    recolectarErrores
  ],
  login
)

router.post("/forgot-password",
  forgotPassword
)

router.patch(
  "/verify",
  [
    check("email","El mail es obligatorio").not().isEmpty(),
    check("email", "El mail no es válido").isEmail(),
    check("code", "El código es obligatorio").not().isEmpty(),
    recolectarErrores
  ],
  verifyUser
)

router.post("/get-user-by-tokenid",
  [
    check("token","El token es obligatorio").not().isEmpty(),
    validarJWT,
    recolectarErrores
  ],
  getUserByTokenId
)

router.patch("/recovery-password",
  [
    validarJWT,
    isVerified,
    check("password","La contraseña es obligatoria").not().isEmpty(),
    check("password", "El password debe ser de 6 caracteres minimo").isLength({min: 6}),
    recolectarErrores
  ],
  recoveryPassword
)


export default router