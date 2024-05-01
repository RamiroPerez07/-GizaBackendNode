import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Order, {IOrder} from "../models/order";
import { errors } from "../errors";

export const getOrders = async (req: Request, res: Response) => {

  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;

  try {
    const orders = await Order.find({usuario: usuarioId});
  
    res.status(200).json({
      data : [
        ...orders
      ]
    })
  } catch (error) {
    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR
    })
  }


}

export const getAllOrders = async (req: Request, res: Response) => {

  try {
    const orders = await Order.find({});
  
    res.status(200).json({
      data : [
        ...orders
      ]
    })
    
  } catch (error) {
    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR
    })
  }


}


export const createOrder = async (req: Request , res: Response) => {

  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;

  const orderData : IOrder = req.body
  
  const data = {
    ...orderData,
    usuario: usuarioId,
    createdAt: new Date(),
    estado: "En Preparación",
    updatedAt: new Date(),
    actualizadoPor: usuarioId,
  }

  try {
    
    const order = new Order(data);
  
    await order.save();
  
    res.status(201).json({
      order
    })

  } catch (error) {
    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR
    })
  }


}

export const findOrderByID = async (req: Request, res: Response) => {

  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;

  const {idPedido} = req.body

  try {
    
    const order : IOrder | null = await Order.findOne({_id: idPedido})
  
    if (!order){
      res.status(404).json({
        msg: errors.NO_ENCONTRADO,
      })
      return
    }
  
    if ( order.usuario.toString() !== String(usuarioId) ){
      res.status(401).json({
        msg: errors.SIN_AUTENTICACION,
      })
      return
    }
  
  
    res.status(200).json({
      order
    })

  } catch (error) {
    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR
    })
  }

}


export const changeOrderStatus = async (req: Request, res: Response) => {
  const usuarioId : ObjectId = req.body.usuarioConfirmado._id;
  const {_id, estado} = req.body;

  try {
    
    //cambio la data del producto
    await Order.findOneAndUpdate(
      {_id: _id},
      {
        estado: estado,
        actualizadoPor: usuarioId,
        updatedAt: new Date(),
      })
  
    res.status(200).json({
      msg: "El pedido se modifico exitosamente"
    });

  } catch (error) {

    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR
    });

  }
}