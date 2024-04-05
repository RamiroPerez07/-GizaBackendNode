import { Request, Response } from "express"
import {MercadoPagoConfig,  Preference } from "mercadopago" //SDK de mercado pago


export const createPreference = async (req: Request, res: Response) => {
  
  try {

    interface Item {
      title: string;
      quantity: number;
      price: number; 
    }
    
    const items : Item[] = req.body

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
        success: "https://facebook.com",
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

    res.status(200).json({
      id: result.id,
    })

  } catch (error) {
    res.status(500).json({
      error: "Error al crear la preferencia",
    })
  }
}