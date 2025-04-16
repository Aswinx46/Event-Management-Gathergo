import { categoryEntity } from "../../../../entities/categoryEntity";


export interface IsearhCategoryUseCase {
    searchCategory(query: string): Promise<categoryEntity[] | []>
}