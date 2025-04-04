import { categoryEntity } from "../../../../entities/categoryEntity";

export interface IfindCategoryUseCaseClient {
    findCategory(): Promise<categoryEntity[] | []>
}