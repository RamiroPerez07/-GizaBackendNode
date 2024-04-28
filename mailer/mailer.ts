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

export const sendEmailForgotPassword = async (to: string, token: string): Promise<void> => {
  const mailOptions = {
    from: '"Giza" gizaperfum@gmail.com',
    to,
    subject: "Recuperar contraseña - Giza Perfum",
    html: `
      <p>¡Hola! Nos indicaste que olvidaste tu contraseña. Para recuperarla, ingresá al siguiente link y generá una nueva:</p>
      <a href="https://giza-frontend-react.vercel.app/restablecer-clave?token=${token}">Restablecer clave</a>
    `
  }

  try {

    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado")
  
  } catch (error) {
    console.log("Error al enviar el correo electrónico: ", error)
  }
}

export const sendEmailFromContact = async (contact: string,fromEmail:string, cellphone: string,  message: string):Promise<void> => {
  const mailOptions = {
    from: '"Giza" gizaperfum@gmail.com',
    to: "gizaperfum@gmail.com",
    subject: `Nueva consulta - ${contact} - Giza Perfum`,
    html: `
      <p>${contact}</p>
      <p>Email: ${fromEmail}</p>
      <p>Teléfono:${cellphone}</p>
      <p>Te envió:</p>
      <p>${message}</p>
    `
  }

  try {

    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado")
  
  } catch (error) {
    console.log("Error al enviar el correo electrónico: ", error)
  }
}