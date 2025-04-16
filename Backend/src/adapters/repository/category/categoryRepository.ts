import { categoryEntity } from "../../../domain/entities/categoryEntity";
import { CategoryUpdate } from "../../../domain/entities/categoryUpdatePayload";
import { IcategoryDatabase } from "../../../domain/interface/repositoryInterfaces/category/categorydatabaseInterface";
import { categoryModel } from "../../../framerwork/database/models/categoryModel";
export class CategoryDatabaseRepository implements IcategoryDatabase {
    async findByName(name: string): Promise<categoryEntity | null> {
        return await categoryModel.findOne({
            title: { $regex: `^${name}$`, $options: "i" } // Case-insensitive exact match
        });
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
    async findCategoryForCreatingService(): Promise<categoryEntity[] | []> {
        return await categoryModel.find({ status: 'active' }).select('title _id')
    }
    async findCategoryForClient(): Promise<categoryEntity[] | []> {
        return await categoryModel.find({ status: 'active' }).select('_id image title').limit(5)
    }
    async changeStatusOfCategory(categoryId: string): Promise<categoryEntity | null> {
        return await categoryModel.findOneAndUpdate({ _id: categoryId },
            [
                {
                    $set: {
                        status: {
                            $cond: {
                                if: { $eq: ['$status', 'active'] },
                                then: 'blocked',
                                else: 'active'
                            }
                        }
                    }
                }
            ]
        )
    }
    async changeNameAndImage(categoryId: string, updates: CategoryUpdate): Promise<boolean | null> {
        if (!Object.keys(updates).length) return false;

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            categoryId,
            updates,
            { new: true }
        );

        return updatedCategory ? true : false;
    }
}   