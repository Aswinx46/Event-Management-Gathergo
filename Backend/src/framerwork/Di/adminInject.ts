import { AdminLoginController } from "../../adapters/controllers/admin/adminLoginController";
import { ApproveVendorController } from "../../adapters/controllers/admin/approveVendorController";
import { FindCategoryController } from "../../adapters/controllers/admin/categoryManagement/findCategoryController";
import { FindAllPendingVendorController } from "../../adapters/controllers/admin/findAllPendingVendor";
import { FindAllRejectedController } from "../../adapters/controllers/admin/findAllRejectedVendorController";
import { FindAllVendorController } from "../../adapters/controllers/admin/findAllVendorController";
import { RejectVendorControllerAdmin } from "../../adapters/controllers/admin/rejectVendorController";
import { AdminRepository } from "../../adapters/repository/admin/adminRepository";
import { CategoryDatabaseRepository } from "../../adapters/repository/category/categoryRepository";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { AdminLoginUseCase } from "../../useCases/admin/adminLoginuseCase";
import { ApproveVendor } from "../../useCases/admin/ApproveVendorStatus";
import { FindCategoryUseCase } from "../../useCases/admin/categoryManagement/findCategoryUseCase";
import { findAllPendingVendors } from "../../useCases/admin/findAllPendingVendorUseCase";
import { FindAllRejectedVendorUseCase } from "../../useCases/admin/findAllRejectedVendorsUseCase";
import { FindAllVendorUsecase } from "../../useCases/admin/findAllVendorUseCase";
import { RejectVendorUseCase } from "../../useCases/admin/rejectVendorUseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";

//-----------------------------Admin login-----------------------
const adminRespository = new AdminRepository()
const adminLoginUseCase = new AdminLoginUseCase(adminRespository)
const jwtService = new JwtService()
const redisService = new RedisService()
export const injectedAdminLoginController = new AdminLoginController(adminLoginUseCase, jwtService, redisService)

//------------------------------fetching vendors---------------------------
const vendorDataBase = new VendorDatabase()
const findAllVendorUseCase = new FindAllVendorUsecase(vendorDataBase)
export const injectedFindAllVendorController = new FindAllVendorController(findAllVendorUseCase)

//------------------------------Fetching pending vendors---------------------
const findAllPendingVendorUseCase = new findAllPendingVendors(vendorDataBase)
export const injectedFindAllPendingVendorController = new FindAllPendingVendorController(findAllPendingVendorUseCase)

//------------------------------Approving vendor-------------------
const approveVendorStatusUseCase = new ApproveVendor(vendorDataBase)
export const injectedApproveVendorStatus = new ApproveVendorController(approveVendorStatusUseCase)

//-------------------------------Rejecting Vendor-----------------------------
const rejectVendorUseCase = new RejectVendorUseCase(vendorDataBase)
export const injectedRejectVendorController = new RejectVendorControllerAdmin(rejectVendorUseCase)

//-------------------------------Find all rejected vendors----------------------------------
const findRejectedVendorUseCase = new FindAllRejectedVendorUseCase(vendorDataBase)
export const injectedFindAllRejectedVendorController = new FindAllRejectedController(findRejectedVendorUseCase)

//-------------------------------find all Category--------------------------------------
const categoryDatabase = new CategoryDatabaseRepository()
const findAllCategoryUseCase = new FindCategoryUseCase(categoryDatabase)
export const injectedFindAllCategoryController = new FindCategoryController(findAllCategoryUseCase)