export interface BookingDetailsInAdminEntity {
    _id?: string;
    serviceId: string;
    clientId: {
        _id: string,
        name: string,
        profileImage: string
    };
    vendorId: {
        _id: string,
        name: string,
        profileImage: string
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