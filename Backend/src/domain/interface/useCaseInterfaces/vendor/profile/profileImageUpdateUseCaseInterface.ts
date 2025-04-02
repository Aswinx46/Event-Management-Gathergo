import { VendorEntity } from "../../../../entities/vendorEntity";

export interface IprofileImageUpdateUseCase {
    uploadProfileImage(id: string, imageUrl: string): Promise<VendorEntity | null>
}