import { categoryEntity } from "../../../../entities/categoryEntity";

export interface IfindCategoryForServiceUseCase {
    findCategoryForService(): Promise<categoryEntity[] | []>
}