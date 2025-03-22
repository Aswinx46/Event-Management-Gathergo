import { VendorEntity } from "../../../entities/vendorEntity";

export interface IfindAllVendorUsecase{
    findAllVendor(pageNo:number):Promise<{vendors:VendorEntity[] | []; totalPages:number}>
}