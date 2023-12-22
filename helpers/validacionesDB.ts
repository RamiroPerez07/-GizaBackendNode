import { sendEmail } from "../mailer/mailer"
import Usuario, { IUser } from "../models/usuario"
import { errors } from "../errors"


export const existeEmail = async( email: string  ): Promise<void> => {

  const existeEmail: IUser | null = await Usuario.findOne({email})

  if (existeEmail && existeEmail.verified) {
    throw new Error(errors.USUARIO_EXISTENTE_VERIFICADO)
  }

  if (existeEmail && !existeEmail.verified) {
    await sendEmail(email, existeEmail.code as string)
    throw new Error(errors.USUARIO_EXISTENTE_NO_VERIFICADO)
  }

  //Esta funcion devuelve como error un 400
}