import { VendorLoginDTO } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IloginVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/loginVendorUseCaseInterface";
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword";

export class LoginVendorUseCase implements IloginVendorUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    private hashpasswordService: hashPassword
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
        this.hashpasswordService = new hashPassword()
    }
    async loginVendor(email: string, password: string): Promise<VendorLoginDTO | null> {
        const vendor = await this.vendorDatabase.findByEmail(email)
        if (!vendor) throw new Error('No vendor exists in this email')
        if (vendor.status == 'block') throw new Error('you are blocked by admin')
        const verifyPassword = await this.hashpasswordService.comparePassword(password, vendor.password!)
        if (!verifyPassword) throw new Error('invalid password')
        const modifiendVendor = {
            _id: vendor?._id,
            email: vendor?.email,
            name: vendor?.name,
            phone: vendor?.phone,
            role: vendor?.role,
            status: vendor?.status,
            vendorId: vendor?.vendorId,
            vendorStatus: vendor?.vendorStatus,
            rejectReason: vendor?.rejectionReason,
            profileImage: vendor?.profileImage,
            aboutVendor: vendor?.aboutVendor
        }
        return modifiendVendor
    }
}