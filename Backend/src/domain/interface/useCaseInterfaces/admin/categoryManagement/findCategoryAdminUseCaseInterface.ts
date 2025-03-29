import { categoryEntity } from "../../../../entities/categoryEntity";

export interface IfindCategoryUseCase {
    findAllCategory(pageNo: number): Promise<{ categories: categoryEntity[] | [], totalPages: number }>
}