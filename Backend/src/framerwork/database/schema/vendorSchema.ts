import { Schema } from "mongoose";
import { VendorEntity } from "../../../domain/entities/vendorEntity";

export const VendorSchema = new Schema<VendorEntity>({
    vendorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    idProof: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", 'block'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ["client", "vendor"],
        default: 'vendor'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        required: false
    },
    onlineStatus: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    vendorStatus: {
        type: String,
        enum: ['pending', 'rejected', 'approved'],
        default: 'pending'
    },
    rejectionReason: {
        type: String,
        required: false
    },
    aboutVendor: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})
