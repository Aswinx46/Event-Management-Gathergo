import { ReviewDetailsDTO } from "../../../domain/entities/reviewDetailsDTO";
import { ServiceWithVendorEntity } from "../../../domain/entities/serviceWithVendorEntity";
import { IreviewRepository } from "../../../domain/interface/repositoryInterfaces/review/reviewRepositoryInterface";
import { IserviceRepository } from "../../../domain/interface/repositoryInterfaces/service/serviceRepositoryInterface";
import { IshowServiceWithVendorUseCase } from "../../../domain/interface/useCaseInterfaces/client/booking/showServiceWithVendorDetailsUseCaseInterface";

export class ServiceWithVendorUseCase implements IshowServiceWithVendorUseCase {
    private serviceDatabase: IserviceRepository
    private reviewDatabase: IreviewRepository
    constructor(serviceDatabase: IserviceRepository, reviewDatabase: IreviewRepository) {
        this.serviceDatabase = serviceDatabase
        this.reviewDatabase = reviewDatabase
    }
    async showServiceWithVendorUseCase(serviceId: string, pageNo: number, rating?: number): Promise<{ service: ServiceWithVendorEntity | null, reviews: ReviewDetailsDTO[], totalPages: number }> {
        const service = await this.serviceDatabase.showServiceDataInBookingPage(serviceId)
        if (!service) throw new Error('No service found in this service ID')
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
        const { reviews, totalPages } = await this.reviewDatabase.findReviews(serviceId, pageNo, rating)
        return { service: serviceWithVendor, reviews, totalPages }
    }
}