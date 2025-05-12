import { ReviewDetailsDTO } from "../../../../entities/reviewDetailsDTO";
import { ServiceWithVendorEntity } from "../../../../entities/serviceWithVendorEntity";

export interface IshowServiceWithVendorUseCase {
    showServiceWithVendorUseCase(serviceId: string, pageNo: number, rating?: number): Promise<{ service: ServiceWithVendorEntity | null, reviews: ReviewDetailsDTO[], totalPages: number }>
}