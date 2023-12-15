import { Model, Schema, Types, model } from "mongoose";

interface IItem {
  id: Number;
  descripcion: String;
  precio: Number;
  cantidad: Number;
}

interface IDetalleOrden{
  contacto: String;
  telefono: String;
  mail: String;
}

export interface IOrder {
  createdAt: Date;
  usuario: Types.ObjectId;
  items: IItem[];
  detalleContacto: IDetalleOrden;
  estado: String;
  monto: Number;
}

const OrderSchema = new Schema<IOrder>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  usuario:  {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  items: {
    type: [
      {
        id: {
          type: Number,
          required: true,
        },
        descripcion: {
          type: String,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        }
      }
    ],
    required: true,
  },
  detalleContacto: {
    contacto: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    }
  },
  estado: {
    type: String,
    required: true,
    default: "En preparación",
  },
  monto: {
    type: Number,
    required: true
  }
})

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;