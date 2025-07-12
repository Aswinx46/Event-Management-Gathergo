import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorAuthenticationUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/registerVendorUseCase";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword";
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid";
export class VendorLoginUsecase implements IvendorAuthenticationUseCase {
    private vendorDatabse: IvendorDatabaseRepositoryInterface
    private hashPassword:hashPassword
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabse = vendorDatabase
        this.hashPassword=new hashPassword()
    }
    async signupVendor(vendor: VendorEntity): Promise<VendorEntity | null> {
        const oldVendor=await this.vendorDatabse.findByEmail(vendor.email)
        if(oldVendor) throw new Error('Already vendor exist in this email')
        const hashedPassword=await this.hashPassword.hashPassword(vendor.password!)
        const vendorId=genarateRandomUuid()
        const newClient= await this.vendorDatabse.createVendor({
            name:vendor.name,
            email:vendor.email,
            password:hashedPassword,
            role:'vendor',
            vendorId,
            idProof:vendor.idProof,
            phone:vendor.phone,
            vendorStatus:'pending'
        })
        return newClient
    }
}