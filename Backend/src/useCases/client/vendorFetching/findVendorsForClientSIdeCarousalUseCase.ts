import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IfindVendorForClientCarousalUseCase } from "../../../domain/interface/useCaseInterfaces/client/vendorFetching/findVendorForClientUseCase";

export class FindVendorForClientUseCase implements IfindVendorForClientCarousalUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async findVendorForClientUseCase(): Promise<VendorEntity[] | []> {
        return this.vendorDatabase.findVendorsForCarousal()
    }
}