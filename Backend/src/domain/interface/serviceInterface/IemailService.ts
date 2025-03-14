export interface IemailService{
    sendEmailOtp(email:string,otp:string):Promise<void>
}