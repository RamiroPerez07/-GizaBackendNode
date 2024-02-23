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