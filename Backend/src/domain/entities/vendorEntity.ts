import { User } from "./userEntity";

export interface VendorEntity extends User {
    idProof: string,
    vendorId: string,
    vendorStatus: 'pending' | 'approved' | 'rejected',
    rejectionReason?:string
}