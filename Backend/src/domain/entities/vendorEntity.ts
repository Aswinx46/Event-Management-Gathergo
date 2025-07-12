import { User } from "./userEntity";

export interface VendorEntity extends User {
    idProof: string,
    vendorId: string,
    vendorStatus: 'pending' | 'approved' | 'rejected',
    rejectionReason?: string;
    aboutVendor?: string
}

export interface VendorLoginDTO extends User {
    vendorId: string,
    vendorStatus: 'pending' | 'approved' | 'rejected',
    rejectReaons?: string;
    aboutVendor?: string
}