import { ImageBufferType } from "../../../../entities/bufferType/ImageBufferType";
import { EventEntity } from "../../../../entities/event/eventEntity";

export interface IeventCreationUseCase {
    createEvent(event: EventEntity, vendorId: string, imageDetails: ImageBufferType[]): Promise<EventEntity>
}