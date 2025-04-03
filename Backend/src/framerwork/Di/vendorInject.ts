import { VendorAuthenticationController } from "../../adapters/controllers/vendor/authentication/registerVendor";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { SendOtpVendorUsecase } from "../../useCases/vendor/authentication/sendOtpVendorUseCase";
import { VendorLoginUsecase } from "../../useCases/vendor/authentication/registerVendorUseCase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { userExistance } from "../services/userExistenceChecking";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { LoginVendorUseCase } from "../../useCases/vendor/authentication/loginVendorUseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";
import { LoginVendorController } from "../../adapters/controllers/vendor/authentication/loginVendorController";
import { ResendOtpVendorUsecase } from "../../useCases/vendor/authentication/resendOtpVendorUseCase";
import { ResendOtpVendorController } from "../../adapters/controllers/vendor/authentication/resendOtpController";
import { ProfileImageUpdateUseCase } from "../../useCases/vendor/profileUpdations/profileImageUpdate";
import { UpdateImageVendorController } from "../../adapters/controllers/vendor/profile/updateImageController";
import { CreateServiceUseCase } from "../../useCases/vendor/service/createServiceUseCase";
import { ServiceRepository } from "../../adapters/repository/service/serviceRepository";
import { CreateServiceController } from "../../adapters/controllers/vendor/service/createServiceController";
import { CategoryDatabaseRepository } from "../../adapters/repository/category/categoryRepository";
import { FindCategoryForServiceController } from "../../adapters/controllers/vendor/service/findCategoryForServiceController";
import { FindCategoryForServiceUseCase } from "../../useCases/vendor/service/findCategoryForServiceUseCase";
import { FindServiceUseCase } from "../../useCases/vendor/service/findServiceUseCase";
import { FindServiceController } from "../../adapters/controllers/vendor/service/findServiceController";


//-----------------Register vendor-------------------//
const EmailService = new emailService()
const otpService = new OtpService()
const vendorRespository = new VendorDatabase()
const clientDatabase = new clientRepository()
const UserExistance = new userExistance(clientDatabase, vendorRespository)
const injectedVendorUseCase = new VendorLoginUsecase(vendorRespository)
const sendOtpVendorUsecase = new SendOtpVendorUsecase(EmailService, otpService, UserExistance)
export const injectedVendorAuthenticationController = new VendorAuthenticationController(injectedVendorUseCase, sendOtpVendorUsecase)

//-------------------Resend OTP-----------------------//
const resendOtpVendorUseCase = new ResendOtpVendorUsecase(EmailService, otpService)
export const injectedResendOtpVendorController = new ResendOtpVendorController(resendOtpVendorUseCase)

//-----------------------Login Vendor---------------------//
const vendorLoginUseCase = new LoginVendorUseCase(vendorRespository)
const jwtService = new JwtService()
const redisService = new RedisService()
export const injectedVendorLoginController = new LoginVendorController(vendorLoginUseCase, jwtService, redisService)

//-----------------------Update profile image in vendor side-----------------------
const updateImageVendorUseCase = new ProfileImageUpdateUseCase(vendorRespository)
export const injectedUpdateImageVendorController = new UpdateImageVendorController(updateImageVendorUseCase)

//-------------------------Service creation-----------------------------
const serviceRepository = new ServiceRepository()
const createServiceUseCase = new CreateServiceUseCase(serviceRepository)
export const injectedCreateServiceController = new CreateServiceController(createServiceUseCase)

//-----------------------Finding categories -------------------------------
const categoryRepository = new CategoryDatabaseRepository()
const findCategoryForServiceUseCase = new FindCategoryForServiceUseCase(categoryRepository)
export const injectedFindCategoryForServiceController = new FindCategoryForServiceController(findCategoryForServiceUseCase)

//-----------------------Find Services---------------------------------------
const findServiceUseCase = new FindServiceUseCase(serviceRepository)
export const injectedFindServiceController = new FindServiceController(findServiceUseCase)