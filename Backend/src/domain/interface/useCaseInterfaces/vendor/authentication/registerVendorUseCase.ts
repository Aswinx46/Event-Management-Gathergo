import { VendorEntity } from "../../../../entities/vendorEntity";

export interface IvendorAuthenticationUseCase {
    // loginVendor(vendor:VendorEntity):Promise<VendorEntity>
    signupVendor(vendor:VendorEntity):Promise<VendorEntity | null>
}