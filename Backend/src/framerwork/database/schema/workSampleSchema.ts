import { Schema } from "mongoose";
import { WorkSamplesEntity } from "../../../domain/entities/vendor/workSampleEntity";

export const workSampleSchema = new Schema<WorkSamplesEntity>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref:'vendors',
        required: true
    }
}, {
    timestamps: true
})