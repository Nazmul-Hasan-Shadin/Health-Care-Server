import nodemailer from 'nodemailer'
import config from '../../../config';


const emailSender=async(email:string,html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: config.emailSender.email,
          pass:config.emailSender.app_password,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
   
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Helathcare 👻" <nazmulhasanshadin000@gmail.email>', // sender address
          to: email, // list of receivers
          subject: "Reset Your password ✔", // Subject line
         // text: "Hello world?", // plain text body
          html, // html body
        });
      
    console.log(info);
    
   
      
}

export default emailSender