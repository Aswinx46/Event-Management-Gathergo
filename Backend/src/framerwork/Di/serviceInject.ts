import { RefreshTokenController } from "../../adapters/controllers/auth/refreshTokenController";
import { checkAdminState } from "../../adapters/middlewares/checkAdmin";
import { tokenTimeExpiryValidationMiddleware } from "../../adapters/middlewares/tokenTimeExpiryMiddleWare";
import { verifyTokenAndCheckBlackList } from "../../adapters/middlewares/tokenValidationMiddleWare";
import { AdminRepository } from "../../adapters/repository/admin/adminRepository";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { RefreshTokenUseCase } from "../../useCases/auth/refreshTokenuseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";
import { TokenService } from "../services/tokenService";
const redisService = new RedisService()
const jwtService = new JwtService()
const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY
const tokenService = new TokenService(redisService, jwtService, ACCESSTOKEN_SECRET_KEY!)

export const injectedVerifyTokenAndCheckBlacklistMiddleWare = verifyTokenAndCheckBlackList(tokenService)

//----------------------------Refresh Token service Inject-----------------------
const clientDatabase = new clientRepository()
const vendorDatabase = new VendorDatabase()
const adminRepository = new AdminRepository()
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService, clientDatabase, vendorDatabase, adminRepository)
export const injectedRefreshTokenController = new RefreshTokenController(refreshTokenUseCase)

//--------------------------Token expiry validation checking middleware-----------
export const injectedTokenExpiryValidationChecking = tokenTimeExpiryValidationMiddleware(jwtService)
export const checkAdminMiddleWare=checkAdminState(jwtService,redisService,adminRepository)