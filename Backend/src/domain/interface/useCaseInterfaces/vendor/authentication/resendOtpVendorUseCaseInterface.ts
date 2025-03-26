export interface IresendOtpVendorUsecase{
    resendOtp(email:string):Promise<void>
}