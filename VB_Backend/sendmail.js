import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.User,
        pass: process.env.APP_PASSWORD,
    },
});

const sendMail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail has been sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending mail:', error);
    }
};

export default sendMail;
