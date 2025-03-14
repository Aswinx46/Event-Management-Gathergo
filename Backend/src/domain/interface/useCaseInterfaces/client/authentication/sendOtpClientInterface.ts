export interface IsendOtpClientInterface{
    execute(email:string):Promise<void>
    verifyOtp(email:string,enteredOtp:string):Promise<boolean>
}