import { NextFunction, Request, Response } from "express";
import { ROLES } from "../helpers/constants";
import { errors } from "../errors";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const {rol} = req.body.usuarioConfirmado;

  if(rol !== ROLES.admin){
    res.status(401).json({
      msg: errors.USUARIO_NO_ADMINISTRADOR,
    })
    return
  }

  next();
}