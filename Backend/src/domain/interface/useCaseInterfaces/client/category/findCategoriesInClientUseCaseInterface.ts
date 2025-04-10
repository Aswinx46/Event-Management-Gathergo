import { categoryEntity } from "../../../../entities/categoryEntity";

export interface IfindCategoriesForListingInClientUseCase {
    findCategories(pageNo: number): Promise<{ categories: categoryEntity[] | [], totalPages: number }>
}