import { Request, Response } from "express";
import Usuario, { IUser } from "../models/usuario";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail, sendEmailForgotPassword } from "../mailer/mailer";
import { generarJWT } from "../helpers/generarJWT";
import { errors } from "../errors";

export const register = async (req: Request, res: Response) => {
  const { usuarioNombre, email, password, rol }: IUser = req.body

  const usuario = new Usuario({usuarioNombre, email, password, rol})

  const salt = bcryptjs.genSaltSync();

  usuario.password = bcryptjs.hashSync(password, salt);

  const adminKey = req.headers["admin-key"]

  if (adminKey === process.env.KEYFORADMIN) {
    usuario.rol = ROLES.admin
  }

  const newCode = randomstring.generate(6)

  usuario.code = newCode

  await usuario.save()

  await sendEmail(email, newCode);

  res.status(201).json({
    usuario,
    msg : "USUARIO_CREADO_EXITOSAMENTE"
  })

}


export const login = async (req: Request, res: Response):Promise<void> => {

  const {email, password}: IUser = req.body;

  try {
    
    const usuario = await Usuario.findOne({email})

    if (!usuario){
      res.status(404).json({
        msg: "No se encontró el mail en la BD"
      });
      return
    }


    const validarPassword = bcryptjs.compareSync(password, usuario.password)


    if(!validarPassword){
      res.status(401).json({
        msg: "La contraseña es incorrecta",
      });
      return;
    }

    const token = await generarJWT(usuario.id);

    res.status(202).json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor"
    })
  }

}


export const verifyUser = async (req: Request, res: Response) => {
  
  const {email, code} = req.body;

  try {

    const usuario = await Usuario.findOne({email})

    if (!usuario){
      res.status(404).json({
        msg: "No se encontró el mail en la BD"
      });
      return
    }

    if(usuario.verified) {
      res.status(400).json({
        msg: "El usuario ya se encuentra verificado."
      });
      return
    }

    if(code !== usuario.code){
      res.status(401).json({
        msg: "El código ingresado no es correcto"
      })
      return
    };

    await Usuario.findOneAndUpdate(
      {email},
      {verified: true})

    res.status(200).json({
      msg: "Usuario verificado con éxito"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor"
    })
  }

}



export const forgotPassword = async (req: Request, res: Response) => {
  //obtengo el email de donde estoy olvidando la contraseña
  const {email} = req.body
  //con el email obtengo el id del usuario
  try {
    const usuario = await Usuario.findOne({email})

    //si no existe el usuario, arrojo un mensaje que no existe en la base de datos
    if (!usuario || usuario === undefined){
      res.status(404).json({
        msg: "No se encontró el mail en la BD"
      });
      return
    }
    //controlo si el usuario esta verificado, sino arrojo error
    if(!usuario.verified) {
      res.status(400).json({
        msg: "El usuario aun no se encuentra verificado."
      });
      return
    }
    //teniendo el id del usuario, genero el token
    const token = await generarJWT(usuario.id);

    //con el token, voy a enviar un correo al mail con el link de acceso
    await sendEmailForgotPassword(email,token)

    res.status(200).json({
      msg: "Mail enviado con éxito"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor"
    })
  }
}


export const getUserByTokenId = async (req: Request, res: Response) => {

  //obtengo el usuario confirmado del cuerpo de la peticion
  const {usuarioConfirmado} = req.body;

  //genero un token para guardar el id del usuario y refrescar
  const token = await generarJWT(usuarioConfirmado.id)

  //finalmente devuelvo el usuario y el token
  res.status(200).json({
    usuario: usuarioConfirmado,
    token
  })
} 

export const recoveryPassword = async (req: Request, res: Response) => {

  //obtengo el usuario confirmado del cuerpo de la peticion
  const {usuarioConfirmado,password} = req.body;

  const salt = bcryptjs.genSaltSync();

  const passwordHash = bcryptjs.hashSync(password, salt);

  //cambio las contraseñas 
  await Usuario.findOneAndUpdate(
    {email: usuarioConfirmado.email},
    {password: passwordHash})

    res.status(200).json({
      msg: "La contraseña se cambio exitosamente"
    })
}