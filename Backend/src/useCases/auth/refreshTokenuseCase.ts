import { IadminRepository } from "../../domain/interface/repositoryInterfaces/admin/IadminDatabaseRepoInterface";
import { IClientDatabaseRepository } from "../../domain/interface/repositoryInterfaces/client/clientdatabaseRepository";
import { IvendorDatabaseRepositoryInterface } from "../../domain/interface/repositoryInterfaces/vendor/vendorDatabaseRepository";
import { IjwtInterface } from "../../domain/interface/serviceInterface/IjwtService";
import { ItokenService } from "../../domain/interface/serviceInterface/ItokenService";
import { IrefreshTokenUseCase } from "../../domain/interface/useCaseInterfaces/auth/refreshTokenUseCaseInterface";

export class RefreshTokenUseCase implements IrefreshTokenUseCase {
    private jwtService: IjwtInterface
    private clientRepository: IClientDatabaseRepository
    private vendorRepository: IvendorDatabaseRepositoryInterface
    private adminRepository: IadminRepository
    constructor(jwtService: IjwtInterface,
        clientRepository: IClientDatabaseRepository,
        vendorRepository: IvendorDatabaseRepositoryInterface,
        adminRepository: IadminRepository) {
        this.adminRepository = adminRepository,
            this.clientRepository = clientRepository,
            this.jwtService = jwtService,
            this.vendorRepository = vendorRepository
    }
    async execute(token: string): Promise<string> {
        const payload = this.jwtService.verifyRefreshToken(token, process.env.REFRESHTOKEN_SECRET_KEY as string)
        if (!payload) throw new Error('Invalid or Expired Refresh Token')
        const userId = payload.userId
        const client = await this.clientRepository.findById(userId)
        const vendor = await this.vendorRepository.findById(userId)
        const admin = await this.adminRepository.findById(userId)

        const user = client || vendor || admin
        const role = client ? 'client' : vendor ? 'vendor' : admin ? 'admin' : null;

        if (!user || !role) throw new Error('User Not Found')

        // if (user.status == 'block') throw new Error('User Blocked')
        const newAccessToken = this.jwtService.createAccessToken(process.env.ACCESSTOKEN_SECRET_KEY as string,
            userId,
            role)

        return newAccessToken
    }
}