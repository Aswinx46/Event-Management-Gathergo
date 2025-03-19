import { VendorAuthenticationController } from "../../adapters/controllers/vendor/authentication/registerVendor";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { SendOtpVendorUsecase } from "../../useCases/vendor/authentication/sendOtpVendorUseCase";
import { VendorLoginUsecase } from "../../useCases/vendor/authentication/vendorLoginUseCase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { userExistance } from "../services/userExistenceChecking";
import { clientRepository} from "../../adapters/repository/client/clientRepository";


//-----------------Register vendor-------------------//
const EmailService=new emailService()
const otpService=new OtpService()
const vendorRespository=new VendorDatabase()
const clientDatabase=new clientRepository()
const UserExistance=new userExistance(clientDatabase,vendorRespository)
const injectedVendorUseCase=new VendorLoginUsecase(vendorRespository)
const sendOtpVendorUsecase=new SendOtpVendorUsecase(EmailService,otpService,UserExistance)
export const injectedVendorAuthenticationController=new VendorAuthenticationController(injectedVendorUseCase,sendOtpVendorUsecase)
