import { clientEntity } from "../../../domain/entities/clientEntity"
import { WalletEntity } from "../../../domain/entities/wallet/wallerEntity"
import { IadminRepository } from "../../../domain/interface/repositoryInterfaces/admin/IadminDatabaseRepoInterface"
import { IwalletRepository } from "../../../domain/interface/repositoryInterfaces/wallet/walletRepositoryInterface"
import { IadminLoginUseCase } from "../../../domain/interface/useCaseInterfaces/admin/adminLoginUseCaseInterface"
import { hashPassword } from "../../../framerwork/hashPassword/hashpassword"
import { genarateRandomUuid } from "../../../framerwork/services/randomUuid"



export class AdminLoginUseCase implements IadminLoginUseCase {
    private adminRepository: IadminRepository
    private hashPassword: hashPassword
    private walletDatabase: IwalletRepository
    constructor(adminRepository: IadminRepository, walletDatabase: IwalletRepository) {
        this.adminRepository = adminRepository
        this.hashPassword = new hashPassword()
        this.walletDatabase = walletDatabase
    }
    async handleLogin(email: string, password: string): Promise<clientEntity | null> {
        const admin = await this.adminRepository.findbyEmail(email)
        if (!admin) throw new Error('Admin not exist in this email')
        if (!admin.isAdmin) throw new Error('You are not an Admin')
        const passwordVerify = await this.hashPassword.comparePassword(password, admin.password!)
        if (!passwordVerify) throw new Error('invalid password')
        const walletId = genarateRandomUuid()
        const existingWallet = await this.walletDatabase.findWalletByUserId(admin._id!)
        if (!existingWallet) {
            const walletDetails: WalletEntity = {
                balance: 0,
                userId: admin._id!,
                userModel: "client",
                walletId,

            }
            const createWallet = await this.walletDatabase.createWallet(walletDetails)
            if(!createWallet) throw new Error("Error while creating waller")
        }

        return admin
    }
}