import { ImageBufferType } from "../../../../entities/bufferType/ImageBufferType";
import { categoryEntity } from "../../../../entities/categoryEntity";

export interface IcreateCategoryUseCase {
    createCategory(title: string, imageDetails: ImageBufferType[]): Promise<categoryEntity>
}