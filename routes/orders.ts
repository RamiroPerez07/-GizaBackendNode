import { Router } from "express";
import { createOrder, findOrderByID, getAllOrders, getOrders } from "../controllers/orders";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificado";
import { check } from "express-validator";
import { isAdmin } from "../middlewares/validarRol";

const router = Router();

//obtener todas las ordenes de un usuario
router.get("/",
  [
    validarJWT,
    recolectarErrores
  ],
  getOrders
)

//obtener todas las ordenes de todos los usuarios (SOLO PARA ADMIN)
router.get("/get-all-orders",
[
  validarJWT,
  isVerified,
  isAdmin,
  recolectarErrores,
],
getAllOrders)


//crear una orden, para eso usamos el post
router.post("/",
  [
    validarJWT,
    isVerified,
    check("monto", "El monto de la orden es obligatorio").not().isEmpty(),
    check("detalleContacto", "El detalle del contacto es obligatorio").not().isEmpty(),
    check("items", "Los productos son obligatorios").not().isEmpty(),
    recolectarErrores,
  ],
  createOrder
)

//buscar una orden por id
router.post("/find-order-by-id",
  [
    validarJWT,
    isVerified,
    recolectarErrores,
  ],
  findOrderByID
)

export default router

