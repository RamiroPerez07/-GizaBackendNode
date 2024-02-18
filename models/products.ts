import { Model, Schema, model, Types } from "mongoose";

export interface IProduct {
  creadoPor: Types.ObjectId;
  descripcion: String;
  marca: String;
  categoria: String;
  precio: Number;
  imagen: String;
  descuento: Number;
  estado: String;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  descripcion:  {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  descuento: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;