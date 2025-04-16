import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IsearhCategoryUseCase } from "../../../domain/interface/useCaseInterfaces/client/category/searchCategoryUseCaseInterface";

export class SearchCategoryUseCase implements IsearhCategoryUseCase {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async searchCategory(query: string): Promise<categoryEntity[] | []> {
        return await this.categoryDatabase.searchCategory(query)
    }
}