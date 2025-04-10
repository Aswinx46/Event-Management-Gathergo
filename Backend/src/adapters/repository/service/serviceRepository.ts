import { ServiceEntity } from "../../../domain/entities/serviceEntity";
import { ServiceWithVendorEntity } from "../../../domain/entities/serviceWithVendorEntity";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { serviceModal } from "../../../framerwork/database/models/serviceModel";
import { VendorDTO } from "../../../domain/entities/vendorDTO";
export class ServiceRepository implements IserviceRepository {
    async createService(service: ServiceEntity): Promise<ServiceEntity> {
        return await serviceModal.create(service)
    }
    async findServiceOfAVendor(vendorId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }> {
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const Services = await serviceModal.find({ vendorId }).skip(skip).limit(limit)
        const totalPages = Math.ceil(await serviceModal.countDocuments() / limit)
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
        const limit = 5
        const page = Math.max(pageNo, 1)
        const skip = (page - 1) * limit
        const Services = await serviceModal.find({ status: 'active' }).select('-createdAt -updatedAt').skip(skip).limit(limit)
        const totalPages = Math.ceil(await serviceModal.countDocuments() / limit)
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
            serviceTitle: service?.serviceTitle,
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
    async findServiceByCategory(categoryId: string, pageNo: number): Promise<{ Services: ServiceEntity[] | [], totalPages: number }> {
        const page = Math.max(pageNo, 1)
        const limit = 5
        const skip = (page - 1) * limit
        const Services = await serviceModal.find({ categoryId: categoryId, status: 'active' }).select('-createdAt -updatedAt').skip(skip).limit(limit)
        const totalPages = Math.ceil(await serviceModal.countDocuments() / limit)
        return { Services, totalPages }
    }

}

