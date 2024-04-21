import { Request, Response } from "express"
import {MercadoPagoConfig,  Payment,  Preference } from "mercadopago" //SDK de mercado pago
import { errors } from "../errors";


export const createPreference = async (req: Request, res: Response) => {
  
  try {

    interface Item {
      title: string;
      quantity: number;
      price: number; 
    }
    
    const items: Item[] = req.body.items

    const external_reference = req.body.external_reference

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
      external_reference: external_reference,
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

  

  const client = new MercadoPagoConfig({
    accessToken : String(process.env.ACCESSTOKENMP),
  })

  const query = req.body;
  
  const topic = query.topic || query.type;

  try {
    if(topic === "payment"){
      console.log("La query es", query)
      const paymentId = query.data.id
      const payment = new Payment(client)
      console.log("el paiment es", payment)
      console.log("el id es", paymentId)
      payment.get({id:Number(paymentId)})
      .then(dataPayment => {
        console.log(dataPayment);
        if(dataPayment.status === "approved"){
          console.log("PAGO APROBADO")
          //codigo actualizando el pedido
        }
        res.status(200).json({
          dataPayment
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: errors.ERROR_EN_EL_SERVIDOR
        })
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: errors.ERROR_EN_EL_SERVIDOR,
    })
  }
}
