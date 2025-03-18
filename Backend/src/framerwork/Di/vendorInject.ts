import { VendorAuthenticationController } from "../../adapters/controllers/vendor/authentication/registerVendor";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { SendOtpVendorUsecase } from "../../useCases/vendor/authentication/sendOtpVendorUseCase";
import { VendorLoginUsecase } from "../../useCases/vendor/authentication/vendorLoginUseCase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";



//-----------------Register vendor-------------------//
const EmailService=new emailService()
const otpService=new OtpService()
const vendorRespository=new VendorDatabase()
const injectedVendorUseCase=new VendorLoginUsecase(vendorRespository)
const sendOtpVendorUsecase=new SendOtpVendorUsecase(EmailService,otpService)
export const injectedVendorAuthenticationController=new VendorAuthenticationController(injectedVendorUseCase,sendOtpVendorUsecase)
