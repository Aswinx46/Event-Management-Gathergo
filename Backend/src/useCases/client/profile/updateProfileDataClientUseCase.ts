import { ImageBufferType } from "../../../domain/entities/bufferType/ImageBufferType";
import { ClientUpdateProfileEntity } from "../../../domain/entities/client/clientUpdateProfileDTO";
import { clientEntity } from "../../../domain/entities/clientEntity";
import { IClientDatabaseRepository } from "../../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IupdateProfileDataUseCase } from "../../../domain/interface/useCaseInterfaces/client/profile/updateProfileDataUseCaseInterface";
import { uploadImageToCloudinary } from "../../../framerwork/services/cloudinaryService";

export class UpdateProfileClientUseCase implements IupdateProfileDataUseCase {
    private clientDatabase: IClientDatabaseRepository
    constructor(clientDatabase: IClientDatabaseRepository) {
        this.clientDatabase = clientDatabase
    }
    async updateClientProfile(client: ClientUpdateProfileEntity, imageDetails: ImageBufferType[]): Promise<clientEntity | null> {

        const cloudinaryPrefix = process.env.CLOUDINARY_PREFIX
        if (!cloudinaryPrefix) throw new Error("No cloudinary prefix found")
        const imageUrls = await Promise.all(
            imageDetails.map((item) => uploadImageToCloudinary(item))
        )
        const editedImageUrls = imageUrls.map((url) => url.replace(cloudinaryPrefix, ''))
        client.profileImage = editedImageUrls[0]
        return await this.clientDatabase.updateProfile(client)
    }
}