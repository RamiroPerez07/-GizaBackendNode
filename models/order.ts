import { Model, Schema, Types, model } from "mongoose";

interface IItem {
  idProducto: Types.ObjectId;
  descripcion: String;
  marca: String;
  categoria: String;
  precio: Number;
  imagen: String;
  descuento: Number;
  estado: String;
  cantidad: Number;
}

interface IDetalleOrden{
  contacto: String;
  documento: String;
  telefono: String;
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
        idProducto: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        descripcion: {
          type: String,
          required: true,
        },
        marca: {
          type: String,
          required: true,
        },
        categoria:{
          type: String,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
        imagen: {
          type: String,
          required: false,
        },
        descuento: {
          type: Number,
          required: false,
        },
        estado: {
          type: String,
          required: false,
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
    documento: {
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