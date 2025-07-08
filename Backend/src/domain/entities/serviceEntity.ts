import { ObjectId } from "mongoose";

export interface ServiceEntity {
    _id?: ObjectId;
    title: string;
    yearsOfExperience: number;
    serviceDescription: string;
    cancellationPolicy: string;
    termsAndCondition: string;
    serviceDuration: string;
    servicePrice: number;
    additionalHourFee: number;
    status: string
    vendorId: ObjectId;
    categoryId: ObjectId
}