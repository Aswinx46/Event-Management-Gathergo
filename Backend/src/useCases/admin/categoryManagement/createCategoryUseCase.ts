import { ImageBufferType } from "../../../domain/entities/bufferType/ImageBufferType";
import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IcreateCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/admin/categoryManagement/createCategoryUseCaseInterface";
import { uploadImageToCloudinary } from "../../../framerwork/services/cloudinaryService";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";
export class CreateCategoryUseCase implements IcreateCategoryUseCase {
    private categoryDatabase: IcategoryDatabase

    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async createCategory(title: string, imageDetails: ImageBufferType[]): Promise<categoryEntity> {
        const cloudinaryPrefix = process.env.CLOUDINARY_PREFIX
        if (!cloudinaryPrefix) throw new Error("No cloudinary prefix found")
        const existingCategory = await this.categoryDatabase.findByName(title)
        if (existingCategory) {
            console.log('inside category')
            throw new Error('This category is already exist')

        }
        const imageUrls = await Promise.all(
            imageDetails.map((item) => uploadImageToCloudinary(item))
        )
        const editedImageUrls = imageUrls.map((url) => url.replace(cloudinaryPrefix, ''))
        const categoryId = genarateRandomUuid()
        return await this.categoryDatabase.createCategory(categoryId, title, editedImageUrls[0])
    }
}