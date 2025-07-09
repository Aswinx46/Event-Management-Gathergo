import { ObjectId } from "mongoose";
import { VendorDTO } from "./vendorDTO";

export interface ServiceWithVendorEntity {
    _id: string | ObjectId;
    title: string;
    serviceDescription: string;
    price: number;
    vendor: VendorDTO;
    duration: string
}
