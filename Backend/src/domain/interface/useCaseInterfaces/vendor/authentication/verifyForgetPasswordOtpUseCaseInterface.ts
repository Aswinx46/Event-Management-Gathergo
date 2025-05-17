export interface IverifyForgetPasswordOtpVendorUseCase {
    verifyOtpForgetPasswordVendor(email: string, otp: string): Promise<boolean>
}