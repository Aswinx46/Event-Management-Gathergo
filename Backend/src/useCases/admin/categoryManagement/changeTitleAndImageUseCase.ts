import { ImageBufferType } from "../../../domain/entities/bufferType/ImageBufferType";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IchangeTitleAndImageCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/admin/categoryManagement/changeTitleAndImageCategoryUseCaseInterface";
import { uploadImageToCloudinary } from "../../../framerwork/services/cloudinaryService";

export class ChangeTitleAndImageUseCase implements IchangeTitleAndImageCategoryUseCase {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async changeTitleAndImage(categoryId: string, images: ImageBufferType[], title?: string): Promise<boolean> {
        if (title) {
            const existingCategory = await this.categoryDatabase.findByName(title)
            if (existingCategory && existingCategory?._id!.toString() !== categoryId) throw new Error("There is already another category in this name")
        }
        const cloudinaryPrefix = process.env.CLOUDINARY_PREFIX
        if (!cloudinaryPrefix) throw new Error("No cloudinary prefix found")
        const imageUrls = await Promise.all(
            images.map((item) => uploadImageToCloudinary(item))
        )
        const editedImageUrls = imageUrls.map((url) => url.replace(cloudinaryPrefix, ''))
        const updates = {
            title: title,
            image: editedImageUrls[0]
        }
        const updateTitleAndImage = await this.categoryDatabase.changeNameAndImage(categoryId, updates)
        if (!updateTitleAndImage) throw new Error('No category presented in ID')
        return true
    }
}