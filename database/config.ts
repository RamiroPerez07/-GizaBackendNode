import mongoose from "mongoose"

export const dbConnection = async(): Promise<void> => {
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl){
      throw new Error("La URL no está correctamente definida en los .env")
    }
    await mongoose.connect(dbUrl)
  }catch(err){
    console.log(err)
    throw new Error("Error a la hora de iniciar la DB")
  }
}