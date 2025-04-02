import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { IfindCategoryForServiceUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/service/findCategoryUseCaseInterface";

export class FindCategoryForServiceUseCase implements IfindCategoryForServiceUseCase {
    private categoryDatabase: IcategoryDatabase
    constructor(categoryDatabase: IcategoryDatabase) {
        this.categoryDatabase = categoryDatabase
    }
    async findCategoryForService(): Promise<categoryEntity[] | []> {
        return this.categoryDatabase.findCategoryForCreatingService()
    }
}