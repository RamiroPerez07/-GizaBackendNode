import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import Usuario, { IUser } from "../models/usuario";
import { errors } from "../errors";

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.headers["x-token"] as string
  
  console.log(token)

  if(!token){
    res.status(401).json({
      msg: "No hay token en la petición"
    });
    return
  }

  try {
    const claveSecreta = process.env.CLAVESECRETA as string;
    const payload = jwt.verify(token, claveSecreta) as JwtPayload;

    const {id} = payload;

    const usuarioConfirmado: IUser | null = await Usuario.findById(id)

    if(!usuarioConfirmado){
      res.status(404).json({
        msg: "El usuario no se ha encontrado en la BD."
      });
      return
    }

    req.body.usuarioConfirmado = usuarioConfirmado;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: errors.TOKEN_NO_VALIDO
    })
  }



}

export default validarJWT