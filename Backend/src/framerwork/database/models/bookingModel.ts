import { Document, model, ObjectId } from "mongoose";
import { BookingEntity } from "../../../domain/entities/bookingEntity";
import { bookingSchema } from "../schema/bookingSchema";

export interface IBookingModel extends Omit<BookingEntity, '_id'>, Document {
    _id: ObjectId
}

export const bookingModel = model<BookingEntity>("bookings", bookingSchema)