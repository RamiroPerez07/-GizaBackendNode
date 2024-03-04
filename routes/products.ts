import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { check } from "express-validator";
import { isAdmin } from "../middlewares/validarRol";
import { createProduct, editProduct, getProducts, getProductsByFilters } from "../controllers/products";

const router = Router();

//crear un producto, se necesitaran permisos de administrador
router.post("/",
  [
    validarJWT,
    isAdmin,
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("marca", "La marca es obligatoria").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty().isNumeric(),
    check("imagen", "La imagen es obligatoria").not().isEmpty(),
    check("descuento", "La descuento debe ser un valor numérico").isNumeric(),
    recolectarErrores
  ],
  createProduct
)

//editar un producto, se necesitan permisos de administrador
router.post("/edit-product",
  [
    validarJWT,
    isAdmin,
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("marca", "La marca es obligatoria").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty().isNumeric(),
    check("imagen", "La imagen es obligatoria").not().isEmpty(),
    check("descuento", "La descuento debe ser un valor numérico").isNumeric(),
    recolectarErrores
  ],
  editProduct
)

router.get("/", getProducts)

router.post("/filter-products",getProductsByFilters) //marca, categoria, precioEntre

export default router

/*
  descripcion: String;
  marca: String;
  categoria: String;
  precio: Number;
  imagen: String;
  descuento: Number;
  estado: String;
  createdAt: Date; */