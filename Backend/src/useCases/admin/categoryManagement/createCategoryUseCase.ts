import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IcreateCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/admin/categoryManagement/createCategoryUseCaseInterface";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";
export class CreateCategoryUseCase implements IcreateCategoryUseCase {
    private categoryDatabase: IcategoryDatabase

    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async createCategory(title: string, img: string): Promise<categoryEntity> {
        const existingCategory = await this.categoryDatabase.findByName(title)
        if (existingCategory){
            console.log('inside category')
            throw new Error('This category is already exist')
            
        } 
        const categoryId = genarateRandomUuid()
        return await this.categoryDatabase.createCategory(categoryId, title, img)
    }
}