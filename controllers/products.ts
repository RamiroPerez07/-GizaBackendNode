import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Product, { IProduct } from "../models/products";

export const createProduct = async (req: Request, res: Response) => {
  
  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;
  const productData : IProduct = req.body

  const data = {
    ...productData,
    creadoPor: usuarioId,
    createdAt: new Date(),
    estado: "Activo"
  }

  const product = new Product(data);

  await product.save();

  res.status(201).json({
    product
  })
}