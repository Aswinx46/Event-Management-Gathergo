import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IprofileImageUpdateUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/profile/profileImageUpdateUseCaseInterface";

export class ProfileImageUpdateUseCase implements IprofileImageUpdateUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
    }
    async uploadProfileImage(id: string, imageUrl: string): Promise<VendorEntity | null> {
        const vendor = await this.vendorDatabase.findById(id)
        if (!vendor) throw new Error('No vendor found in this email')
        const updateVendor = await this.vendorDatabase.updateProfileImage(id, imageUrl)
        if (!updateVendor) throw new Error('error while updating profile image in vendor side')
        return updateVendor
    }
}