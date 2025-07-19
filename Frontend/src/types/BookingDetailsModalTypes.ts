interface Service {
    additionalHourFee: number;
    _id: string
    title: string;
    serviceDescription: string;
    serviceDuration: string;
    servicePrice: number;
}

interface Vendor {
    _id: string;
    name: string;
    email: string;
    phone: number;
    profileImage: string;
}

interface Client {
    _id: string;
    name: string;
    email: string;
    phone: number;
    profileImage: string;
}
export interface BookingDetails {
    _id: string;
    date: string[];
    email: string;
    phone: number;
    paymentStatus: string;
    additionalHourFee: number
    status: string;
    service: Service;
    amount: number
    vendor: Vendor;
    client: Client
    vendorApproval: string
    rejectionReason?: string
}


export interface Booking {
    _id: string;
    date: string[];
    email: string;
    phone: number;
    paymentStatus: string;
    status: string;
    service: Service;
    amount: number
    additionalHourFee: number
    vendor: Vendor;
    client: Client
    vendorApproval: string
    rejectionReason?: string
    extraHour?: number
}
