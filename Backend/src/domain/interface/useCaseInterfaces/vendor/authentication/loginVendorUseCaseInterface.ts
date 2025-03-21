import { VendorEntity } from "../../../../entities/vendorEntity";
export interface IloginVendorUseCase {
    loginVendor(email:string,password:string):Promise<VendorEntity | null>
}