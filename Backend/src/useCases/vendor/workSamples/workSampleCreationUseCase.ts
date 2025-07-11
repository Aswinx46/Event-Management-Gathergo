import { ImageBufferType } from "../../../domain/entities/bufferType/ImageBufferType";
import { WorkSamplesEntity } from "../../../domain/entities/vendor/workSampleEntity";
import { IworkSampleRepository } from "../../../domain/interface/repositoryInterfaces/workSamples/workSampleRepositoryInterface";
import { IWorkSampleCreationUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/workSamples/workSampleCreationUseCaseInterface";
import { uploadImageToCloudinary, uploadMultipleImages } from "../../../framerwork/services/cloudinaryService";

export class WorkSampleCreationUseCase implements IWorkSampleCreationUseCase {
    private workSampleDatabase: IworkSampleRepository
    constructor(workSampleDatabase: IworkSampleRepository) {
        this.workSampleDatabase = workSampleDatabase
    }
    async createWorkSample(workSample: WorkSamplesEntity, imageDetails: ImageBufferType[]): Promise<WorkSamplesEntity | null> {
        const cloudinaryPrefix = process.env.CLOUDINARY_PREFIX
        if (!cloudinaryPrefix) throw new Error("No cloudinary prefix found")
        const imageUrls = await Promise.all(
            imageDetails.map((item) => uploadImageToCloudinary(item))
        )
        const editedImageUrls = imageUrls.map((url) => url.replace(cloudinaryPrefix, ''))
        workSample.images = editedImageUrls
        return await this.workSampleDatabase.createWorkSamples(workSample)
    }
}