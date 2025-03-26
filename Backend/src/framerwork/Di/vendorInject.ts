import { VendorAuthenticationController } from "../../adapters/controllers/vendor/authentication/registerVendor";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { SendOtpVendorUsecase } from "../../useCases/vendor/authentication/sendOtpVendorUseCase";
import { VendorLoginUsecase } from "../../useCases/vendor/authentication/registerVendorUseCase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { userExistance } from "../services/userExistenceChecking";
import { clientRepository} from "../../adapters/repository/client/clientRepository";
import { LoginVendorUseCase } from "../../useCases/vendor/authentication/loginVendorUseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";
import { LoginVendorController } from "../../adapters/controllers/vendor/authentication/loginVendorController";
import { ResendOtpVendorUsecase } from "../../useCases/vendor/authentication/resendOtpVendorUseCase";
import { ResendOtpVendorController } from "../../adapters/controllers/vendor/authentication/resendOtpController";


//-----------------Register vendor-------------------//
const EmailService=new emailService()
const otpService=new OtpService()
const vendorRespository=new VendorDatabase()
const clientDatabase=new clientRepository()
const UserExistance=new userExistance(clientDatabase,vendorRespository)
const injectedVendorUseCase=new VendorLoginUsecase(vendorRespository)
const sendOtpVendorUsecase=new SendOtpVendorUsecase(EmailService,otpService,UserExistance)
export const injectedVendorAuthenticationController=new VendorAuthenticationController(injectedVendorUseCase,sendOtpVendorUsecase)

//-------------------Resend OTP-----------------------//
const resendOtpVendorUseCase=new ResendOtpVendorUsecase(EmailService,otpService)
export const injectedResendOtpVendorController=new ResendOtpVendorController(resendOtpVendorUseCase)

//-----------------------Login Vendor---------------------//
const vendorLoginUseCase=new LoginVendorUseCase(vendorRespository)
const jwtService=new JwtService()
const redisService=new RedisService()
export const injectedVendorLoginController=new LoginVendorController(vendorLoginUseCase,jwtService,redisService)

