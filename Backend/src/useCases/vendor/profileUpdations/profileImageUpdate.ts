import { ImageBufferType } from "../../../domain/entities/bufferType/ImageBufferType";
import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IprofileImageUpdateUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/profile/profileImageUpdateUseCaseInterface";
import { uploadImageToCloudinary } from "../../../framerwork/services/cloudinaryService";

export class ProfileImageUpdateUseCase implements IprofileImageUpdateUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async uploadProfileImage(id: string, imageDetails: ImageBufferType[]): Promise<VendorEntity | null> {
        const vendor = await this.vendorDatabase.findById(id)
        if (!vendor) throw new Error('No vendor found in this email')
        const cloudinaryPrefix = process.env.CLOUDINARY_PREFIX
        if (!cloudinaryPrefix) throw new Error("No cloudinary prefix found")
        const imageUrls = await Promise.all(
            imageDetails.map((item) => uploadImageToCloudinary(item))
        )
        const editedImageUrls = imageUrls.map((url) => url.replace(cloudinaryPrefix, ''))
        const updateVendor = await this.vendorDatabase.updateProfileImage(id, editedImageUrls[0])
        if (!updateVendor) throw new Error('error while updating profile image in vendor side')
        return updateVendor
    }
}