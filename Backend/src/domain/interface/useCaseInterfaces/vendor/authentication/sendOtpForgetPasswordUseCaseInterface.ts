export interface IsendOtpForForgetPasswordVendorUseCase {
    sendOtpForForgetPassword(email: string): Promise<boolean>
}