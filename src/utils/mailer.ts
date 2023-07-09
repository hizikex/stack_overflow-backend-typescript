import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const newUserMail = async (options: any) => {
    //Create a transport object
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user: 'hizikugwuanya@gmail.com',
          pass: 'olutcctqhogitidw',
          secure: false,
        }
      });
      

    let mailOptions = {
        from: process.env.USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
      await transporter.sendMail(mailOptions)
}

export default newUserMail