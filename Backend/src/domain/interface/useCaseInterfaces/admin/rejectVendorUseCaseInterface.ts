import { VendorEntity } from "../../../entities/vendorEntity";

export interface IrejectVendorUseCase {
    rejectVendor(vendorid:string,newStatus:string,rejectionReason:string):Promise<VendorEntity>
}