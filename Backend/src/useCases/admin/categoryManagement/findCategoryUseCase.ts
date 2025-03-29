import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IfindCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/admin/categoryManagement/findCategoryAdminUseCaseInterface";

export class FindCategoryUseCase implements IfindCategoryUseCase {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async findAllCategory(pageNo: number): Promise<{ categories: categoryEntity[] | []; totalPages: number; }> {
        const { categories, totalPages } = await this.categoryDatabase.findCategory(pageNo)
        return { categories, totalPages }
    }
}