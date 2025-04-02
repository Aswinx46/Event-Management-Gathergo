import { serviceSchema } from "../schema/serviceSchema";
import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { model, ObjectId } from "mongoose";

export interface IserviceModal extends Omit<ServiceEntity, "_id">, Document {
    _id: ObjectId
}

export const serviceModal = model<ServiceEntity>("service", serviceSchema)