import { User } from "./userEntity";

export interface VendorEntity extends User{
    idProof:string,
    vendorId:string
}