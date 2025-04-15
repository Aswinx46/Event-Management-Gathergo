import { VendorEntity } from "../../../../entities/vendorEntity";

export interface IupdateAboutAndPhoneUseCase {
    updateAboutAndPhone(vendorId: string, about: string, phone: string,name:string): Promise<VendorEntity>
}