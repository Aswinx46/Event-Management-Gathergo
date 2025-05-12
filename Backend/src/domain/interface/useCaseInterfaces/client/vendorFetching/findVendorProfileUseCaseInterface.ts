import { VendorProfileEntityInClient } from "../../../../entities/vendor/vendorProfileEntityInClient";

export interface IfindVendorProfileUseCase {
    findVendorProfile(vendorId: string): Promise<VendorProfileEntityInClient | null>
}