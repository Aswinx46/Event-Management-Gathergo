import { Schema } from "mongoose";
import { ServiceEntity } from "../../../domain/entities/serviceEntity";

export const serviceSchema = new Schema<ServiceEntity>({
    additionalHourFee: {
        type: Number,
        required: true
    },
    cancellationPolicy: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    serviceDescription: {
        type: String,
        required: true
    },
    serviceDuration: {
        type: String,
        required: true
    },
    servicePrice: {
        type: Number,
        required: true
    },
    serviceTitle: {
        type: String,
        required: true
    },
    termsAndCondition: {
        type: String,
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'vendors',
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
   
},
    {
        timestamps: true
    })
