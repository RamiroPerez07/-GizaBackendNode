import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Product, { IProduct } from "../models/products";
import { errors } from "../errors";

export const createProduct = async (req: Request, res: Response) => {
  
  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;
  const productData : IProduct = req.body

  const data = {
    ...productData,
    creadoPor: usuarioId,
    createdAt: new Date(),
  }

  const product = new Product(data);

  await product.save();

  res.status(201).json({
    product
  })
}

export const getProducts = async (req: Request, res: Response) => {
  try {

    const products = await Product.find({});

    res.status(200).json({
      data : [
        ...products
      ]
    })
    
  } catch (error) {
    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR,
    })
  }
}

export const getProductsByFilters = async (req: Request, res: Response) => {

  const {marca, categoria, precioEntre, descripcion} = req.body

  try {

    let condicion = {} //inicio el objeto de la condicion

    if (marca !== ""){
      condicion = {...condicion, marca}
    }

    if (categoria !== ""){
      condicion = {...condicion, categoria}
    }

    const products = await Product.find(condicion);

    let filterProducts = [...products]

    if (descripcion !== ""){
      filterProducts = filterProducts.filter(p => String(p.descripcion).includes(descripcion))
    }

    filterProducts = filterProducts.filter(p => p.precio>= precioEntre[0] && p.precio<= precioEntre[1])

    console.log(marca, categoria, descripcion, precioEntre)

    res.status(200).json({
      data : [
        ...filterProducts
      ]
    })
    
  } catch (error) {
    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR,
    })
  }
}