import { categoryEntity } from "../../../../entities/categoryEntity";

export interface IcreateCategoryUseCase {
    createCategory(title: string, img: string): Promise<categoryEntity>
}