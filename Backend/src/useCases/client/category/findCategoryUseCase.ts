import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IfindCategoryUseCaseClient } from "../../../domain/interface/useCaseInterfaces/client/category/findCategoryUseCaseInterface";

export class FindCategoryClientUseCase implements IfindCategoryUseCaseClient {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async findCategory(): Promise<categoryEntity[] | []> {
        return await this.categoryDatabase.findCategoryForClient()
    }
}