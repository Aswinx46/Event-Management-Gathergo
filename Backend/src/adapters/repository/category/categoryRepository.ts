import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { categoryModel } from "../../../framerwork/database/models/categoryModel";
export class CategoryDatabaseRepository implements IcategoryDatabase {
    async findByName(name: string): Promise<categoryEntity | null> {
        return await categoryModel.findOne({ title: name })

    }
    async createCategory(categoryId: string, title: string, image: string): Promise<categoryEntity> {
        return await categoryModel.create({ categoryId, title, image })
    }
    async findCategory(pageNo: number): Promise<{ categories: categoryEntity[] | [], totalPages: number }> {
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const categories = await categoryModel.find().skip(skip).limit(limit)
        const totalPages = Math.ceil(await categoryModel.countDocuments() / limit)
        return { categories, totalPages }
    }
}   