import { ImageBufferType } from "../../../../entities/bufferType/ImageBufferType";
import { VendorEntity } from "../../../../entities/vendorEntity";

export interface IprofileImageUpdateUseCase {
    uploadProfileImage(id: string, imageDetails: ImageBufferType[]): Promise<VendorEntity | null>
}