import { VendorEntity } from "../../../entities/vendorEntity";

export interface IvendorDatabaseRepositoryInterface{
    createVendor(vendor:VendorEntity):Promise<VendorEntity>
    findByEmail(email:string):Promise<VendorEntity | null>
    findAllVendors(pageNo:number):Promise<{Vendors:VendorEntity[] | [];totalPages:number}>
    findAllPendingVendors(pageNo: number): Promise<{ pendingVendors: VendorEntity[]; totalPages: number }>
}