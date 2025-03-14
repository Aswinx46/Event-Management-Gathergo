import { IemailService } from "../../domain/interface/serviceInterface/IemailService";
import nodemailer from 'nodemailer'
import { otpEmailTemplate } from "../../templates/otpTemplate";
export class emailService implements IemailService{
    private transporter:nodemailer.Transporter
    constructor(){
        this.transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass:process.env.NODEMAILER_PASSWORD
            }
        })
    }

    async sendEmailOtp(email: string, otp: string): Promise<void> {
        const mailOptions={
            from:process.env.NODEMAILER_EMAIL,
            to:email,
            subject:"Your otp code",
            html:otpEmailTemplate(otp)
        };
        try {
            await this.transporter.sendMail(mailOptions)
            console.log(`otp sended to ${email}`)
        } catch (error) {
            console.log('error while sending top ',error)
            throw new Error('failed to send otp')
        }
    }
}