import { ServiceEntity } from "../../../../entities/serviceEntity";
import { VendorProfileEntityInClient } from "../../../../entities/vendor/vendorProfileEntityInClient";

export interface IfindVendorProfileUseCase {
    findVendorProfile(vendorId: string, pageNo: number): Promise<{ vendorProfile: VendorProfileEntityInClient | null, services: ServiceEntity[] | [], totalPages: number }>
}