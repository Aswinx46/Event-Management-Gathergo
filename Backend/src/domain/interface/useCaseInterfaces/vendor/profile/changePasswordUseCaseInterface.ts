export interface IchangePasswordVendorUseCase {
    changePasswordVendor(vendorId: string, newPassword: string, oldPassword: string): Promise<boolean>
}