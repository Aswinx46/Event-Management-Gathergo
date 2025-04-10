import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IfindCategoriesForListingInClientUseCase } from "../../../domain/interface/useCaseInterfaces/client/category/findCategoriesInClientUseCaseInterface";

export class FindCategoriesForListingUseCase implements IfindCategoriesForListingInClientUseCase {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async findCategories(pageNo: number): Promise<{ categories: categoryEntity[] | [], totalPages: number }> {
        const { categories, totalPages } = await this.categoryDatabase.findCategory(pageNo)
        return { categories, totalPages }
    }
}