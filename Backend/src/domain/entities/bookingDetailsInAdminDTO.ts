import { ObjectId } from "mongoose";

export interface BookingDetailsInAdminEntity {
  _id?: ObjectId;
  serviceId: {
    _id: ObjectId,
    serviceTitle: string,
    servicePrice: number,
    categoryId: {
      _id: ObjectId,
      title: string
    }
  };
  clientId: {
    _id: ObjectId,
    name: string,
    profileImage?: string
  };
  vendorId: {
    _id: ObjectId,
    name: string,
    profileImage?: string
  };
  date: Date[];
  email: string;
  phone: number;
  vendorApproval: "Pending" | "Approved" | "Rejected";
  paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded";
  rejectionReason?: string
  status: "Pending" | "Rejected" | "Completed" | "Cancelled"
  createdAt: Date
  isComplete: boolean
}

export interface PopulatedBookingForAdmin extends Omit<BookingDetailsInAdminEntity, 'serviceId' | 'clientId' | 'vendorId'> {
  serviceId: {
    _id: ObjectId;
    title: string;
    servicePrice: number;
    categoryId: {
      _id: ObjectId;
      name: string;
    };
  };
  clientId: {
    _id: ObjectId;
    name: string;
    profileImage?: string;
  };
  vendorId: {
    _id: ObjectId;
    name: string;
    profileImage?: string;
  };
}
