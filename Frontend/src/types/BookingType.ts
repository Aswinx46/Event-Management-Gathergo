export interface BookingType {
    _id?: string;
    serviceId: string;
    clientId: string;
    vendorId: string;
    date: Date[];
    email: string;
    phone: number;
    vendorApproval: "Pending" | "Approved" | "Rejected";
    paymentStatus: "Pending" | "Failed" | "Successfull" | "Refunded";
    rejectionReason?: string
    status: "Pending" | "Rejected" | "Completed"
    createdAt: Date
    isComplete: boolean
}