import { clientEntity } from "../../../domain/entities/clientEntity"
import { IadminRepository } from "../../../domain/interface/repositoryInterfaces/admin/IadminDatabaseRepoInterface"
import { IadminLoginUseCase } from "../../../domain/interface/useCaseInterfaces/admin/adminLoginUseCaseInterface"
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword"



export class AdminLoginUseCase implements IadminLoginUseCase {
    private adminRepository: IadminRepository
    private hashPassword: hashPassword
    constructor(adminRepository: IadminRepository) {
        this.adminRepository = adminRepository
        this.hashPassword = new hashPassword()
    }
    async handleLogin(email: string, password: string): Promise<clientEntity | null> {
        const admin = await this.adminRepository.findbyEmail(email)
        if (!admin) throw new Error('Admin not exist in this email')
        if (!admin.isAdmin) throw new Error('You are not an Admin')
        const passwordVerify = await this.hashPassword.comparePassword(password, admin.password)
        if(!passwordVerify) throw new Error('invalid password')
            return admin
    }
}