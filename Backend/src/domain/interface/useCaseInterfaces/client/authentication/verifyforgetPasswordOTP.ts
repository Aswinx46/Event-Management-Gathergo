export interface IverifyForgetPasswordOTP {
    verifyForgetPasswordOtp(email: string, enteredOtp: string): Promise<boolean>
}