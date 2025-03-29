import { categoryEntity } from "../../../entities/categoryEntity";
import { clientEntity } from "../../../entities/clientEntity";

export interface IcategoryDatabase {
    findByName(name: string): Promise<categoryEntity | null>
    createCategory(categoryId: string, title: string, image: string): Promise<categoryEntity>
    findCategory(pageNo: number): Promise<{ categories: categoryEntity[] | [], totalPages: number }>
}