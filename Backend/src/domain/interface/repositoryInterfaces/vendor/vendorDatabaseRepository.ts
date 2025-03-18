import { VendorEntity } from "../../../entities/vendorEntity";

export interface IvendorDatabaseRepositoryInterface{
    createVendor(vendor:VendorEntity):Promise<VendorEntity>
    findByEmail(email:string):Promise<VendorEntity | null>
}