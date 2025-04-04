import { categoryEntity } from "../../../entities/categoryEntity";

export interface IcategoryDatabase {
    findByName(name: string): Promise<categoryEntity | null>
    createCategory(categoryId: string, title: string, image: string): Promise<categoryEntity>
    findCategory(pageNo: number): Promise<{ categories: categoryEntity[] | [], totalPages: number }>
    findCategoryForCreatingService(): Promise<categoryEntity[] | []>
    findCategoryForClient(): Promise<categoryEntity[] | []>
    changeStatusOfCategory(categoryId: string): Promise<categoryEntity | null>
}
