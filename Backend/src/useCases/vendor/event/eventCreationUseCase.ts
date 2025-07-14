import { Worker } from "worker_threads";
import { EventEntity } from "../../../domain/entities/event/eventEntity";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IeventCreationUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/event/eventCreationUseCaseInterface";

import { ImageBufferType } from "../../../domain/entities/bufferType/ImageBufferType";
import { uploadImageToCloudinary } from "../../../framerwork/services/cloudinaryService";

export class EventCreationUseCase implements IeventCreationUseCase {
    private eventDatabase: IeventRepository
    private cloudinaryPrefix: string
    constructor(eventDatabase: IeventRepository, cloudinaryPrefix: string) {
        this.eventDatabase = eventDatabase
        // if(!cloudinaryPrefix) throw new Error("No Cloudinary preset available")
        this.cloudinaryPrefix = cloudinaryPrefix
    }
    async createEvent(event: EventEntity, vendorId: string, imageDetails: ImageBufferType[]): Promise<EventEntity> {
        event.hostedBy = vendorId
        event.schedule = event.schedule.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const imageUrls = await Promise.all(
            imageDetails.map((item) => uploadImageToCloudinary(item))
        )
        const editedImageUrls = imageUrls.map((url) => url.replace(this.cloudinaryPrefix, ''))

        event.posterImage = editedImageUrls
        const createEvent = await this.eventDatabase.createEvent(event)
        if (!createEvent) throw new Error('Error while creating event')
        return createEvent
    }
}