import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IloginVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/loginVendorUseCaseInterface";
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword";

export class LoginVendorUseCase implements IloginVendorUseCase{
    private vendorDatabase:IvendorDatabaseRepositoryInterface
    private hashpasswordService:hashPassword
    constructor(vendorDatabase:IvendorDatabaseRepositoryInterface)
    {
        this.vendorDatabase=vendorDatabase
        this.hashpasswordService=new hashPassword()
    }
    async loginVendor(email: string, password: string): Promise<VendorEntity | null> {
        const vendor=await this.vendorDatabase.findByEmail(email)
        if(!vendor) throw new Error ('No vendor exists in this email')
            const verifyPassword=await this.hashpasswordService.comparePassword(password,vendor.password)
        if(!verifyPassword) throw new Error('invalid password')
            return vendor
    }
}