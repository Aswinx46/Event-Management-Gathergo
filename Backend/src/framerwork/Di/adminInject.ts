import { AdminLoginController } from "../../adapters/controllers/admin/adminLoginController";
import { ApproveVendorController } from "../../adapters/controllers/admin/approveVendorController";
import { ChangeStatusCategoryController } from "../../adapters/controllers/admin/categoryManagement/changeStatusCategoryController";
import { ChangeTitleAndImageCategoryController } from "../../adapters/controllers/admin/categoryManagement/changeTitleAndImageController";
import { CreateCategoryController } from "../../adapters/controllers/admin/categoryManagement/createCategoryController";
import { FindCategoryController } from "../../adapters/controllers/admin/categoryManagement/findCategoryController";
import { BlockClientController } from "../../adapters/controllers/admin/client/blockClientController";
import { ClientUnblockController } from "../../adapters/controllers/admin/client/unblockClientController";
import { FindAllClientsController } from "../../adapters/controllers/admin/findAllClientsController";
import { FindAllPendingVendorController } from "../../adapters/controllers/admin/findAllPendingVendor";
import { FindAllRejectedController } from "../../adapters/controllers/admin/findAllRejectedVendorController";
import { FindAllVendorController } from "../../adapters/controllers/admin/findAllVendorController";
import { RejectVendorControllerAdmin } from "../../adapters/controllers/admin/rejectVendorController";
import { VendorBlockController } from "../../adapters/controllers/admin/vendorManagement/vendorBlockController";
import { VendorUnblockController } from "../../adapters/controllers/admin/vendorManagement/vendorUnblockController";
import { AdminRepository } from "../../adapters/repository/admin/adminRepository";
import { CategoryDatabaseRepository } from "../../adapters/repository/category/categoryRepository";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { WalletRepository } from "../../adapters/repository/wallet/walletRepository";
import { AdminLoginUseCase } from "../../useCases/admin/authentication/adminLoginuseCase";

import { ChangeStatusOfCategory } from "../../useCases/admin/categoryManagement/changeStatusOfCategoryUseCase";
import { ChangeTitleAndImageUseCase } from "../../useCases/admin/categoryManagement/changeTitleAndImageUseCase";
import { CreateCategoryUseCase } from "../../useCases/admin/categoryManagement/createCategoryUseCase";
import { FindCategoryUseCase } from "../../useCases/admin/categoryManagement/findCategoryUseCase";
import { BlockClientUseCase } from "../../useCases/admin/userManagement/clientBlockUseCase";
import { ClientUnblockUseCase } from "../../useCases/admin/userManagement/clientUnblockUseCase";

import { FindAllClientUseCase } from "../../useCases/admin/userManagement/findAllClientUseCase";
import { ApproveVendor } from "../../useCases/admin/vendorManagement/ApproveVendorStatus";
import { findAllPendingVendors } from "../../useCases/admin/vendorManagement/findAllPendingVendorUseCase";
import { FindAllRejectedVendorUseCase } from "../../useCases/admin/vendorManagement/findAllRejectedVendorsUseCase";
import { FindAllVendorUsecase } from "../../useCases/admin/vendorManagement/findAllVendorUseCase";
import { RejectVendorUseCase } from "../../useCases/admin/vendorManagement/rejectVendorUseCase";
import { VendorBlockUseCase } from "../../useCases/admin/vendorManagement/vendorBlockUseCase";
import { VendorUnblockUseCase } from "../../useCases/admin/vendorManagement/vendorUnblockUseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";

//-----------------------------Admin login-----------------------
const adminRespository = new AdminRepository()
const walletDatabase = new WalletRepository()
const adminLoginUseCase = new AdminLoginUseCase(adminRespository, walletDatabase)
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

//------------------------------Find all Clients-----------------------
const ClientRepository = new clientRepository()
const findAllClientUseCase = new FindAllClientUseCase(ClientRepository)
export const injectedFindAllClientController = new FindAllClientsController(findAllClientUseCase)

//-------------------------------find all Category--------------------------------------
const categoryDatabase = new CategoryDatabaseRepository()
const findAllCategoryUseCase = new FindCategoryUseCase(categoryDatabase)
export const injectedFindAllCategoryController = new FindCategoryController(findAllCategoryUseCase)

//------------------------------- Create category-----------------------------
const createCategoryUseCase = new CreateCategoryUseCase(categoryDatabase)
export const injectedCreateCategoryController = new CreateCategoryController(createCategoryUseCase)

//----------------------------Change status category----------------------
const changeStatusCategory = new ChangeStatusOfCategory(categoryDatabase)
export const InjectedChangeStatusCategoryController = new ChangeStatusCategoryController(changeStatusCategory)

//-----------------------------block client-----------------------
const blockClientUseCase = new BlockClientUseCase(ClientRepository)
export const injectedBlockClientController = new BlockClientController(blockClientUseCase, redisService)

//---------------------------- unblock client------------------
const unblockClientUseCase = new ClientUnblockUseCase(ClientRepository)
export const injectedClientUnblockController = new ClientUnblockController(unblockClientUseCase, redisService)

//----------------------------block vendor-------------------------
const blockVendorUsecase = new VendorBlockUseCase(vendorDataBase)
export const injectedVendorBlockController = new VendorBlockController(blockVendorUsecase, redisService)

//--------------------------unblock vendor------------------
const unblockVendorUseCase = new VendorUnblockUseCase(vendorDataBase)
export const injectedVendorUnblockController = new VendorUnblockController(unblockVendorUseCase, redisService)

//---------------------------Category title and image change----------------------------
const changeTitleAndImageUseCase = new ChangeTitleAndImageUseCase(categoryDatabase)
export const injectedChangeTitleAndImageController = new ChangeTitleAndImageCategoryController(changeTitleAndImageUseCase)