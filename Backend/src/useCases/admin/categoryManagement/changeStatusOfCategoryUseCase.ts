import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IchangeStatusOfCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/admin/categoryManagement/changeStatusOfCategoryUsecaseI";

export class ChangeStatusOfCategory implements IchangeStatusOfCategoryUseCase {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async changeStatusCategory(categoryId: string): Promise<boolean> {
        const statusChangedCategory = await this.categoryDatabase.changeStatusOfCategory(categoryId)
        if (!statusChangedCategory) throw new Error('No category found in this ID')
        return true
    }
}