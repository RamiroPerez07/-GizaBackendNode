import { ROLES } from "../helpers/constants";
import { Schema, model, Model } from "mongoose";

export interface IUser {
  usuarioNombre: string;
  email: string;
  password: string;
  rol?: string;
  code?: string;
  verified?: string;
}

const UserSchema = new Schema<IUser>({
  usuarioNombre: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"]
  },
  email: {
    type: String,
    require: [true, "El correo es obligatorio"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  rol: {
    type: String,
    default: ROLES.user
  },
  code: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false,
  }
})

UserSchema.methods.toJSON = function(){
  const {__v, password, _id, code, ...usuario} = this.toObject();
  return usuario
}

const Usuario: Model<IUser> = model<IUser>("Usuario", UserSchema)

export default Usuario
