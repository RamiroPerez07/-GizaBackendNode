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
        success: "https://giza-frontend-react.vercel.app/pago-aprobado",
        failure: "https://giza-frontend-react.vercel.app/pago-aprobado",
        pending: "https://giza-frontend-react.vercel.app/pago-aprobado",
      },
      notification_url: "https://giza-backend-node.vercel.app/payment/notify",
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



export const notifyPayment = async (req: Request, res: Response) => {
  console.log(req.body)
}
