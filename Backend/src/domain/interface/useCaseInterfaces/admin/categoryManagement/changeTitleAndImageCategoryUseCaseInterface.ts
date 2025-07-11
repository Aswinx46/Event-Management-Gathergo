import { ImageBufferType } from "../../../../entities/bufferType/ImageBufferType";
import { CategoryUpdate } from "../../../../entities/categoryUpdatePayload";

export interface IchangeTitleAndImageCategoryUseCase {
    changeTitleAndImage(categoryId: string, images: ImageBufferType[], title?: string): Promise<boolean>
}