export interface IsendOtpForForgetPasswordClient {
    sendOtpForForgetPassword(email: string): Promise<void>
}