import { CategoryUpdate } from "../../../../entities/categoryUpdatePayload";

export interface IchangeTitleAndImageCategoryUseCase {
    changeTitleAndImage(categoryId: string, updates: CategoryUpdate): Promise<boolean>
}