import { Request, Response } from "express";
import { sendEmailFromContact } from "../mailer/mailer";

export const sendContactMail = async (req: Request, res: Response) => {

  interface ContactInfo {
    contacto: string;
    email: string;
    telefono: string;
    mensaje: string;
  }

  const {contacto, email, telefono, mensaje}: ContactInfo = req.body;

  try {
    await sendEmailFromContact(contacto,email,telefono,mensaje)
    
  } catch (error) {
    res.status(500).json({
      msg: "Error al enviar el mail"
    }) 
  } 


  res.status(200).json({
    data : {contacto, email, telefono, mensaje},
  })
}