import { AdminLoginController } from "../../adapters/controllers/admin/adminLoginController";
import { FindAllVendorController } from "../../adapters/controllers/admin/findAllVendorController";
import { AdminRepository } from "../../adapters/repository/admin/adminRepository";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { AdminLoginUseCase } from "../../useCases/admin/adminLoginuseCase";
import { FindAllVendorUsecase } from "../../useCases/admin/findAllVendorUseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";

//-----------------------------Admin login-----------------------
const adminRespository=new AdminRepository()
const adminLoginUseCase=new AdminLoginUseCase(adminRespository)
const jwtService=new JwtService()
const redisService=new RedisService()
export const injectedAdminLoginController=new AdminLoginController(adminLoginUseCase,jwtService,redisService)

//------------------------------fetching vendors---------------------------
const vendorDataBase=new VendorDatabase()
const findAllVendorUseCase=new FindAllVendorUsecase(vendorDataBase)
export const injectedFindAllVendorController=new FindAllVendorController(findAllVendorUseCase)