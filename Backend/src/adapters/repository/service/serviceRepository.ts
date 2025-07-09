import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { ServiceWithVendorEntity } from "../../../domain/entities/serviceWithVendorEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { serviceModal } from "../../../framerwork/database/models/serviceModel";
import { VendorDTO } from "../../../domain/entities/vendorDTO";
import { Types } from "mongoose";

interface Filter {
    status: string
    categoryId?: string
}
export class ServiceRepository implements IserviceRepository {
    async createService(service: ServiceEntity): Promise<ServiceEntity> {
        return await serviceModal.create(service)
    }
    async findServiceOfAVendor(vendorId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }> {
        const limit = 3
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const Services = await serviceModal.find({ vendorId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalPages = Math.ceil(await serviceModal.countDocuments({ vendorId: new Types.ObjectId(vendorId) }) / limit)
        return { Services, totalPages }
    }
    async editService(service: ServiceEntity, serviceId: string): Promise<ServiceEntity | null> {
        return await serviceModal.findByIdAndUpdate(serviceId, service, { new: true })
    }
    async findServiceById(serviceId: string): Promise<ServiceEntity | null> {
        return await serviceModal.findById(serviceId)
    }
    async changeStatus(serviceId: string): Promise<ServiceEntity | null> {
        return await serviceModal.findOneAndUpdate(
            { _id: serviceId },
            [
                {
                    $set: {
                        status: {
                            $cond: {
                                if: { $eq: ["$status", "active"] },
                                then: "blocked",
                                else: "active"
                            }
                        }
                    }
                }
            ],
            { new: true }
        );
    }
    async findServiceForClient(pageNo: number): Promise<{ Services: ServiceEntity[] | []; totalPages: number; }> {
        const limit = 6
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const Services = await serviceModal.find({ status: 'active' }).select('-createdAt -updatedAt').skip(skip).limit(limit)
        const totalPages = Math.ceil(await serviceModal.countDocuments({ status: 'active' }) / limit)
        return { Services, totalPages }
    }
    async showServiceDataInBookingPage(serviceId: string): Promise<ServiceWithVendorEntity | null> {
        const service = await serviceModal.findOne({ _id: serviceId, status: 'active' })
            .populate<{ vendorId: VendorDTO }>({
                path: 'vendorId',
                match: { status: 'active' },
                select: 'name email phone profileImage'
            })
        if (!service || !service.vendorId) throw new Error('Service or active vendor not found')
        const serviceWithVendor: ServiceWithVendorEntity = {
            _id: service?._id,
            price: service?.servicePrice,
            serviceDescription: service?.serviceDescription,
            title: service?.title,
            duration: service?.serviceDuration,
            vendor: {
                _id: service?.vendorId?._id,
                email: service?.vendorId?.email,
                name: service?.vendorId?.name,
                phone: service?.vendorId?.phone,
                profileImage: service?.vendorId?.profileImage
            }
        }
        // console.log('service',serviceWithVendor)
        return serviceWithVendor
    }
    async findServiceByCategory(categoryId: string | null, pageNo: number, sortBy: string): Promise<{ Services: ServiceEntity[] | [], totalPages: number }> {

        const page = Math.max(pageNo, 1)
        const limit = 6
        const skip = (page - 1) * limit
        const sortOptions: Record<string, any> = {
            "a-z": { title: 1 },
            "z-a": { title: -1 },
            "price-low-high": { servicePrice: 1 },
            "price-high-low": { servicePrice: -1 },
            "newest": { createdAt: -1 },
            "oldest": { createdAt: 1 }
        }
        const sort = sortOptions[sortBy] || { createdAt: -1 }

        const filter: Filter = { status: 'active' }
        if (categoryId) filter.categoryId = categoryId
        const Services = await serviceModal.find(filter).collation({ locale: 'en', strength: 2 }).select('-createdAt -updatedAt').skip(skip).limit(limit).sort(sort)
        const totalPages = Math.ceil(await serviceModal.countDocuments(filter) / limit)
        console.log(totalPages)
        return { Services, totalPages }
    }
    async searchService(query: string): Promise<ServiceEntity[] | []> {
        const regex = new RegExp(query || '', 'i');
        return await serviceModal.find({ title: { $regex: regex }, status: 'active' }).select('_id title ')
    }
}

