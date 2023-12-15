import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
  service : "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "gizaperfum@gmail.com",
    pass: process.env.MAILPASS,
  },
  from: "gizaperfum@gmail.com"
})

export const sendEmail = async (to: string, cod: string): Promise<void> => {
  const mailOptions = {
    from: '"Giza" gizaperfum@gmail.com',
    to,
    subject: "Codigo de verificación para Giza Perfum",
    text: `
      ¡Hola! Llegó tu código de verificación para Giza Perfum.
      El código es ${cod}
    `,
  }

  try {

    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado")
  
  } catch (error) {
    console.log("Error al enviar el correo electrónico: ", error)
  }
}