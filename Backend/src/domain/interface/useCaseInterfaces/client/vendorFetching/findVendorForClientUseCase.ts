import { VendorEntity } from "../../../../entities/vendorEntity";

export interface IfindVendorForClientCarousalUseCase {
    findVendorForClientUseCase(): Promise<VendorEntity[] | []>
}