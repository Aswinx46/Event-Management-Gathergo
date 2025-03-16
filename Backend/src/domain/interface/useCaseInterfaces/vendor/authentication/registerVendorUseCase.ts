import { VendorEntity } from "../../../../entities/vendorEntity";

export interface VendorLoginUseCase {
    loginVendor(vendor:VendorEntity):Promise<VendorEntity>
}