import { VendorEntity } from "../../../entities/vendorEntity";

export interface IvendorDatabaseRepositoryInterface {
    createVendor(vendor: VendorEntity): Promise<VendorEntity>
    findByEmail(email: string): Promise<VendorEntity | null>
    findAllVendors(pageNo: number): Promise<{ Vendors: VendorEntity[] | []; totalPages: number }>
    findAllPendingVendors(pageNo: number): Promise<{ pendingVendors: VendorEntity[] | []; totalPages: number }>
    changeVendorStatus(vendorId: string, newStatus: string): Promise<VendorEntity>
    findById(vendorId: string): Promise<VendorEntity | null>
    rejectPendingVendor(vendorId: string, newStatus: string, rejectionReason: string): Promise<VendorEntity>
    findAllRejectedVendor(pageNo: number): Promise<{ rejectedVendors: VendorEntity[] | []; totalPages: number }>
    forgetPassword(email:string,newPassword:string):Promise<VendorEntity | null>
}