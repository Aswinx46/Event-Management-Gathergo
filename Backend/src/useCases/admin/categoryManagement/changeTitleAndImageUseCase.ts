import { CategoryUpdate } from "../../../domain/entities/categoryUpdatePayload";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IchangeTitleAndImageCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/admin/categoryManagement/changeTitleAndImageCategoryUseCaseInterface";

export class ChangeTitleAndImageUseCase implements IchangeTitleAndImageCategoryUseCase {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async changeTitleAndImage(categoryId: string, updates: CategoryUpdate): Promise<boolean> {
        const updateTitleAndImage = await this.categoryDatabase.changeNameAndImage(categoryId, updates)
        if (!updateTitleAndImage) throw new Error('No category presented in ID')
        return true
    }
}