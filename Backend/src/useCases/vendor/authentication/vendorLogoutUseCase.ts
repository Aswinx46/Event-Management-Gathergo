import { IjwtInterface } from "../../../domain/interface/serviceInterface/IjwtService";
import { IredisService } from "../../../domain/interface/serviceInterface/IredisService";
import { IvendorLogoutUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/authentication/vendorLogoutUseCase";

export class VendorLogoutUseCase implements IvendorLogoutUseCase {
    private redisService: IredisService
    private jwtService: IjwtInterface
    constructor(redisService: IredisService, jwtService: IjwtInterface) {
        this.redisService = redisService
        this.jwtService = jwtService
    }
    async vendorLogout(token: string): Promise<boolean> {
        const decode = this.jwtService.tokenDecode(token)
        const exp = decode?.exp
        if (!exp) throw new Error('Invalid Token')
        const currentTime = Math.floor(Date.now() / 1000);
        const ttl = exp - currentTime;
       
        if (ttl > 0) {
            await this.redisService.set(`blacklist:${token}`, ttl, 'true')
            return true
        }
        return false
    }
}