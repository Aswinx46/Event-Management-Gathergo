import { VendorEntity } from "../../../../entities/vendorEntity";

export interface IforgetPasswordVendorUseCase {
    forgetPassword(email: string, newPassword: string): Promise<VendorEntity | null>
}