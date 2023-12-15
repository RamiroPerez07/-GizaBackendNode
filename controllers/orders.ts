import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Order, {IOrder} from "../models/order";

export const getOrders = async (req: Request, res: Response) => {

  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;

  const orders = await Order.find({usuario: usuarioId});

  res.status(200).json({
    data : [
      ...orders
    ]
  })

}

export const createOrder = async (req: Request , res: Response) => {

  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;

  const orderData : IOrder = req.body
  
  const data = {
    ...orderData,
    usuario: usuarioId,
    createdAt: new Date(),
    estado: "En Preparación"
  }

  const order = new Order(data);

  await order.save();

  res.status(201).json({
    order
  })

}