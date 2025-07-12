import {  VendorLoginDTO } from "../../../../entities/vendorEntity";
export interface IloginVendorUseCase {
    loginVendor(email:string,password:string):Promise<VendorLoginDTO | null>
}