import { Schema } from 'mongoose'
import { BookingEntity } from '../../../domain/entities/bookingEntity'
export const bookingSchema = new Schema<BookingEntity>({
    clientId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Failed", "Successfull", "Refunded"],
        default: "Pending"
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    vendorApproval: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: 'Pending'
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
})