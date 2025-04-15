import { IvendorDatabaseRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IhashPassword } from "../../../domain/interface/serviceInterface/IhashPassword";
import { IchangePasswordVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/profile/changePasswordUseCaseInterface";

export class ChangePasswordVendorUseCase implements IchangePasswordVendorUseCase {
    private vendorDatabase: IvendorDatabaseRepositoryInterface
    private hashPassword: IhashPassword
    constructor(vendorDatabase: IvendorDatabaseRepositoryInterface, hashPassword: IhashPassword) {
        this.vendorDatabase = vendorDatabase
        this.hashPassword = hashPassword
    }
    async changePasswordVendor(vendorId: string, newPassword: string, oldPassword: string): Promise<boolean> {
        const passwordInDb = await this.vendorDatabase.findPassword(vendorId)
        console.log('newPasswrod',newPassword)
        console.log('oldPassword',oldPassword)
        if (!passwordInDb) throw new Error("No vendor Found in this ID")
        const verifyOldPassword = await this.hashPassword.comparePassword(oldPassword, passwordInDb)
        if (!verifyOldPassword) throw new Error("Old password is not correct")
        const checkNewPasswordWithOld = await this.hashPassword.comparePassword(newPassword, passwordInDb)
        if (checkNewPasswordWithOld) throw new Error('Cant use old password as new again')
        const hashedPassword = await this.hashPassword.hashPassword(newPassword)
        if (!hashedPassword) throw new Error('Error while hashing password')
        return await this.vendorDatabase.changePassword(vendorId, hashedPassword)

    }
}