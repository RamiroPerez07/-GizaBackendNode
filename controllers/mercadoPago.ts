import { Request, Response } from "express"
import {MercadoPagoConfig,  Preference } from "mercadopago" //SDK de mercado pago
import Order from "../models/order";


export const createPreference = async (req: Request, res: Response) => {
  
  try {

    interface Item {
      title: string;
      quantity: number;
      price: number; 
    }
    
    const items: Item[] = req.body.items

    console.log(items)
  
    let products = items.map(item => {
      return{
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "ARS"
      }
    })
  
    
    const body : any = {
      items: products,
      back_urls: {
        success: "https://giza-backend-node.vercel.app/payment/pay-success",
        failure: "https://facebook.com",
        pending: "https://facebook.com",
      },
      auto_return: "approved",
    }
    
    const client = new MercadoPagoConfig({
      accessToken : String(process.env.ACCESSTOKENMP),
    })

    const preference = new Preference(client);

    const result = await preference.create({body});

    console.log(result)

    res.status(200).json({
      id: result.id,
    })

  } catch (error) {
    res.status(500).json({
      error: "Error al crear la preferencia",
    })
  }
}

export const getPaySuccess = async (req: Request, res: Response) => {

  const{payment_id, status, external_reference, merchant_order_id} = req.body; //obtengo los parametros

  await Order.findOneAndUpdate(
    {_id: external_reference},
    {
      idPago: payment_id,
      estadoPago: status,
      referenciaExterna: external_reference,
      idPedidoComercianteMP: merchant_order_id,
    })

    window.location.href = "https://giza-frontend-react.vercel.app/pago-aprobado"  //redirijo al frontend

  res.status(200).json({
    msg: "El pago se aprobó exitosamente"
  });
}
export const getPayFailure = async (req: Request, res: Response) => {


}
export const getPayPending = async (req: Request, res: Response) => {


}


