import { VendorEntity } from "../../../entities/vendorEntity";

export interface IapproveVendorStatusUsecase{
    changeVendorStatus(vendorId:string,newStatus:string):Promise<VendorEntity>
}