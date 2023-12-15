import express, {Express} from "express"
//middleware
import cors from "cors";
//
// rutas
import authRoutes from "../routes/auth"
import orderRoutes from "../routes/orders"
//
import { dbConnection } from "../database/config";   //funcion que conecta a la base de datos

export class Server{

  app: Express
  port: string | number | undefined
  authPath: string
  ordersPath: string
  //issuesPath : string

  constructor() {
    this.app = express()
    this.port = process.env.PORT;
    this.authPath = "/auth";
    this.ordersPath = "/orders"
    //this.issuesPath = "/issues"
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB(): Promise<void> {
    await dbConnection();
  }

  middlewares():void{
    this.app.use(express.json())
    this.app.use(cors({origin: '*'}))  //para hacer el deploy de la api
  }

  routes(): void {
    this.app.use(this.authPath, authRoutes)
    this.app.use(this.ordersPath, orderRoutes)
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en puerto ${this.port}`);
    })
  }
}