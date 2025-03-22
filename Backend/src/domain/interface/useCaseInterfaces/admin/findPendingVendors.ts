import { VendorEntity } from "../../../entities/vendorEntity";

export interface IfindPendingVendors{
    findPendingVendors(pageNo:number):Promise<{pendingVendors:VendorEntity[] | [];totalPages:number}>
}