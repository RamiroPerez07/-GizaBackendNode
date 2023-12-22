import { NextFunction, Request, Response } from "express";
import Usuario, { IUser } from "../models/usuario";
import { sendEmail } from "../mailer/mailer";
import { errors } from "../errors";

export const verificarMailUsuario = async (req: Request, res: Response, next: NextFunction) => {
  
  const {email} = req.body

  const usuario: IUser | null = await Usuario.findOne({email})

  if (usuario && usuario.verified) {
    res.status(400).json({
      usuario,
      msg: errors.USUARIO_EXISTENTE_VERIFICADO
    })
    return
  }

  if (usuario && !usuario.verified) {
    await sendEmail(email, usuario.code as string)
    res.status(400).json({
      usuario,
      msg: errors.USUARIO_EXISTENTE_NO_VERIFICADO
    })
    return
  }

  next();
}