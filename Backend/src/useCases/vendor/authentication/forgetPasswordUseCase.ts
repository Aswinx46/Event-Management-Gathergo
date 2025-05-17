import { hash } from "crypto";
import { VendorEntity } from "../../../domain/entities/vendorEntity";
import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IforgetPasswordVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/forgetPasswordUseCaseInterface";
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword";
export class ForgetPasswordVendorUseCase implements IforgetPasswordVendorUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    private hashPassword: hashPassword
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface) {
        this.vendorDatabase = vendorDatabase
        this.hashPassword = new hashPassword()
    }
    async forgetPassword(email: string, newPassword: string): Promise<VendorEntity | null> {
        const user = await this.vendorDatabase.findByEmail(email)
        if (!user) throw new Error('No vendor found in this email')
        const hashPassword = await this.hashPassword.hashPassword(newPassword)
        if (!hashPassword) throw new Error('error while hashing new password')
        const updateVendor = await this.vendorDatabase.forgetPassword(email, hashPassword)
        if (!updateVendor) throw new Error('error while updating new password in vendor')
        return updateVendor
    }
}