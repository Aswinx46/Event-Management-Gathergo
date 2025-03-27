import { VendorEntity } from "../../../entities/vendorEntity";

export interface IfindAllRejectedVendor {
    findRejectedVendors(pageNo: number): Promise<{ rejectedVendors: VendorEntity[] | []; totalPages: number }>
}